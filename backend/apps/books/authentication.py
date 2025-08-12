import json
import requests
from jose import jwt, JWTError
from rest_framework import authentication, exceptions
from django.contrib.auth.models import User
import os
from dotenv import load_dotenv
load_dotenv()

class Auth0DRFAuthentication(authentication.BaseAuthentication):
    """
    DRF Authentication class that validates JWT tokens issued by Auth0,
    following custom validation steps similar to the Auth0 quickstart validator.
    """

    def __init__(self):
        self.auth0_domain = os.getenv('AUTH0_DOMAIN') 
        self.audience = os.getenv('AUTH0_API_AUDIENCE') 
        self.issuer = f'https://{self.auth0_domain}/'
        self.jwks_url = f'https://{self.auth0_domain}/.well-known/jwks.json'
        self._jwks = None

    @property
    def jwks(self):
        # Cache the JWKS to avoid fetching every request
        if not self._jwks:
            response = requests.get(self.jwks_url)
            if response.status_code != 200:
                raise exceptions.AuthenticationFailed('Unable to fetch JWKS keys from Auth0.')
            self._jwks = response.json()
        return self._jwks

    def get_token_from_header(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise exceptions.AuthenticationFailed('Authorization header is expected.')

        parts = auth_header.split()
        if parts[0].lower() != 'bearer':
            raise exceptions.AuthenticationFailed('Authorization header must start with Bearer.')
        elif len(parts) == 1:
            raise exceptions.AuthenticationFailed('Token not found.')
        elif len(parts) > 2:
            raise exceptions.AuthenticationFailed('Authorization header must be Bearer token.')

        return parts[1]

    def get_rsa_key(self, unverified_header):
        for key in self.jwks['keys']:
            if key['kid'] == unverified_header.get('kid'):
                return {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
        return None

    def authenticate(self, request):
        token = self.get_token_from_header(request)

        try:
            unverified_header = jwt.get_unverified_header(token)
        except JWTError:
            raise exceptions.AuthenticationFailed('Invalid JWT header.')

        rsa_key = self.get_rsa_key(unverified_header)

        if not rsa_key:
            raise exceptions.AuthenticationFailed('Unable to find appropriate key.')

        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=['RS256'],
                audience=self.audience,
                issuer=self.issuer
            )
        except JWTError as e:
            raise exceptions.AuthenticationFailed(f'Token validation error: {str(e)}')

        # Example: fetch or create a user from 'sub' claim in Auth0 token
        user_id = payload.get('sub')
        if not user_id:
            raise exceptions.AuthenticationFailed('User ID (sub) not found in token.')

        user, created = User.objects.get_or_create(username=user_id)
        
        # Attach the payload to the request as the auth context if required
        request.auth = payload

        return (user, token)
