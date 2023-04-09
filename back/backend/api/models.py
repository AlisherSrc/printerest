from django.db import models

# Create your models here.

USER_STATUS_CHOICES = [
        ("active","Active"),
        ("inactive","Inactive"),
        ("disabled","Disabled")
    ]

class User(models.Model):
    username = models.CharField(max_length=255)
    phone = models.CharField(max_length=255,blank=True,null=True)
    email = models.EmailField()
    status = models.CharField(max_length=10,choices=USER_STATUS_CHOICES, default="active")
    # when we will make auth, here will be the password as well
    def __str__(self):
        return self.username

class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Pin(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True,null=True)
    contentUrl = models.URLField()
    timeUploaded = models.DateTimeField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    destinationLink = models.URLField()

    def __str__(self):
        return self.title

    def to_json(self):
        return {
            "title": self.title,
            "description": self.description,
            "contentUrl": self.contentUrl,
            "timeUploaded": self.timeUploaded.strftime("%Y-%m-%d %H:%M:%S"),
            "user": [self.user.id, self.user.name],
            "tags": [tag.to_json() for tag in self.tags.all()],
            "destinationLink": self.destinationLink,
        }

class Album(models.Model):
    name = models.CharField(max_length=255)
    pins = models.ManyToManyField(Pin)
    user = models.ForeignKey(User,on_delete=models.CASCADE,default=-1)
#   type, like public or private, we can implement this functionality if we will have time


class Category(models.Model):
    name = models.CharField(max_length=255)
    pins = models.ManyToManyField(Pin,blank=True)

    def __str__(self):
        return self.name

