from model_mommy.recipe import Recipe, seq
from account.models import User


email_seq = seq('test@lightmatter.com')

user_recipe = Recipe(User,
                     first_name='Johnny',
                     last_name=seq('User'),
                     email=email_seq,
)
