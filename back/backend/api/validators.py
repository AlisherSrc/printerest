from django.core.validators import URLValidator
from django.core.exceptions import ValidationError

class EmptyStringURLValidator(URLValidator):
    def __call__(self, value):
        if value == '':
            print(value)
            return

        super().__call__(value)
