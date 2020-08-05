from model_bakery.recipe import Recipe, seq

from .models import User

email_seq = seq("test@lightmatter.com")

user = Recipe(User, first_name="Johnny", last_name=seq("User"), email=email_seq)
