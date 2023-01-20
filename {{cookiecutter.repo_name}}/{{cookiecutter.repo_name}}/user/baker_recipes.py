from model_bakery.recipe import Recipe
from model_bakery.utils import seq

from .models import User

email_seq = seq("test@lightmatter.com")

user = Recipe(
    User,
    first_name="Johnny",
    last_name="Rico",
    email="jonnyrico@fednet.gov",
)
user_seq = Recipe(User, first_name="Johnny", last_name=seq("User"), email=email_seq)
