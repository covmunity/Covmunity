# Covmunity

Allow people to respect quarantines and self isolation

## Idea:

* Build an app, or easily accessible website, that keeps track of your health status and your location.
* Easily accessible website, that keeps track of your health status and your location.

## Aim:

* Allow people to respect quarantines and self isolation
* Get an idea on the number of people affected by the disease but not officially tested
* Facilitate communication between local helpers and people in needHow would it work?

The app allows you to log your health status by asking you whether you feel healthy or sick. A questionnaire follows.

* In case you are healthy, it asks whether you live with other people and if they are healthy as well. In that case it asks you if you would be up to help someone in need (e.g. by buying grocieries).
* If you are sick, the app asks you if you have been tested and for how long you've been having symptoms (the first time). Then it asks your symptoms (you choose from a list or add "other") and if you have a fever you can enter your temperature. Eventually it asks if you need help with shopping. 

Everyday the app asks the same questionnaire and saves your data in a form of calendar entry, so you see your healthy days and your sick days. It could also show you the suggested time you should still stay at home to be safe you overcame the illness when you get better. 

## UI Requirements

On a map, that shows your neighborhood (e.g. 100m radius) you can see every logged person as a point in a different color: 

* Red: Tested positive, sick
* Green: Healthy, asymptomatic person, lives with healthy people
* Yellow: Asymptomatic, lives with sick person, shouldn't leave their home
* Orange: With symptoms

Any person can observe this local map, only for helping features.

Institutions should be able to access the whole data, with locations and different health status, to control the spread of the disease.

To facilitate the interaction between helpers and people in need, everything should work through the application: from grocery, medicine lists to the payment. In order that physical contact is hopefully none.

## Principal issues:

* Privacy of health data
* App store policies
* Safe storage of the health and personal data

## Questions Structure:

### Starting the account (allows insertion of data corresponding to max three people) 

* Gender
* Age range (e.g. choose from: <20, 21-40,41-60,>60)
* Have you been abroad in the past 3 weeks, or have you been in close contact with a confirmed sick person? Yes/No answer.
* Are you part of an at-risk group? (list cases) Answer yes or no
* Postal code

### Daily Questionaire 

* see handmade scheme

* Issue: Maybe we should allow the user to manually change their tested/non-tested status, for example in their calendar entries page, because the question is asked only once but that may change in the future

## Use cases:

* As a user, I want to register me.
* As a user, I want to report my health status (symptoms, temperature, oxymeter...).
* As a user, I want to report the health status of a person that lives with me.
* As an unhealthy user, I want to ask for help to avoid getting out.
* As a healthy user, I want to help someone that needs to stay quarenteened at home.y quarenteened at home.
* As a user, I want to see a map with information about cases around me.
* As a user, I want aggregated data about symtoms.
* As a user with special authorization, as a public health institution, I want to access all raw data

Citizens could be the "first" users, with a less accurate description of health data, so they can get help and stay at home. When enough data is accumulated, complete data can be used by scientists and institutions.tay at home. When enough data is accumulated, complete data can be used by scientists and institutions.tay at home. When enough data is accumulated, complete data can be used by scientists and institutions.tay at home. When enough data is accumulated, complete data can be used by scientists and institutions.

## Prototype

![image](https://user-images.githubusercontent.com/9881407/77881863-21ef9e00-7260-11ea-895a-00c8c95dc531.png)

> The preview might change during the development.

## Technical Requirements:

### Frontend web

* Reactjs [future]
* Static Website (html, js, jquery)[now]
* Fomantic-UI https://fomantic-ui.com/

### Mobile [future]

* React Native [future]

### Backend

* Simple HTTP REST API
  * authentication
  * health data submission
  * health data queries
  * chores/volunteers management

* Python Flask
* Docker

## Existing questionaries around:

* https://covapp.charite.de/
* https://coronavirus.unisante.ch/
* https://www.coronachecker.ch
* https://www.covidtracker.ch/#form
* https://www.coronamadrid.com/adrid.com/
* https://www.enotfallmedizin.ch/service/corona_check/s://www.enotfallmedizin.ch/service/corona_check/
