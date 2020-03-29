# Covmunity

Allow people to respect quarantines and self isolation

## Idea:

- Build an app, or easily accessible website, that keeps track of your health status and your location.

- Easily accessible website, that keeps track of your health status and your locationp, or easily accessible website, that keeps track of your health status and your location 

## Aim:

- Allow people to respect quarantines and self isolation
- Get an idea on the number of people affected by the disease but not officially tested
- Facilitate communication between local helpers and people in needHow would it work?

The app allows you to log your health status by asking you whether you feel healthy or sick. A questionnaire follows.

- In case you are healthy, it asks whether you live with other people and if they are healthy as well. In that case it asks you if you would be up to help someone in need (e.g. by buying grocieries).
- If you are sick, the app asks you if you have been tested and for how long you've been having symptoms (the first time). Then it asks your symptoms (you choose from a list or add "other") and if you have a fever you can enter your temperature. Eventually it asks if you need help with shopping. 

Everyday the app asks the same questionnaire and saves your data in a form of calendar entry, so you see your healthy days and your sick days. It could also show you the suggested time you should still stay at home to be safe you overcame the illness when you get better. 

## UI Requirements

On a map, that shows your neighborhood (e.g. 100m radius) you can see every logged person as a point in a different color: 

- Red: Tested positive, sick
- Green: Healthy, asymptomatic person, lives with healthy people
- Yellow: Asymptomatic, lives with sick person, shouldn't leave their home
- Orange: With symptoms

Any person can observe this local map, only for helping features.

Institutions should be able to access the whole data, with locations and different health status, to control the spread of the disease.

To facilitate the interaction between helpers and people in need, everything should work through the application: from grocery, medicine lists to the payment. In order that physical contact is hopefully none.
(Jaime: This can be too much for a 72h project, we could aim to put people in contact, sharing contact info or something like this)

## Principal issues:

- Privacy of health data
- App store policies (Jaime: Make it a webapp by now? I guess we are not going to have time to be approved in an app store)
- Safe storage of the health and personal data

## Questions Structure:

1. Starting the account (allows insertion of data corresponding to max three people) 

- Gender
- Age range (e.g. choose from: <20, 21-40,41-60,>60)
- Have you been abroad in the past 3 weeks, or have you been in close contact with a confirmed sick person? Answer yes or no (Sets person automatically as "yellow", meaning they should stay at home, in the case they declare everyone in their household and themselves feel healthy)
- Are you part of an at-risk group? (list cases) Answer yes or no
- Postal code

2. Daily Questionaire 

- see handmade scheme

- Issue: Maybe we should allow the user to manually change their tested/non-tested status, for example in their calendar entries page, because the question is asked only once but that may change in the future
