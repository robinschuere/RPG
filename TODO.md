# TODO List 

- [x] Rename the table sexes to genders
- [ ] Create a character through the character page
  - Create a character flow
    - set a name
    - choose a gender
    - choose a race
    - get the basispoints from the backend (upon creation, we need to check this)
    - set the basispoints (Look at how we created the GameStats page to give an idea)
  - the character should be created with the default profession of adventurer
  - The initial characterState will be built upon the loginCharacter command.
- [x] Return Gender and Race through getGameState
- [ ] Remove the extra fetchers on the gameStats for genders and races since they should be able on the state store.
- [ ] Define stories
- [ ] Create admin pages to create entities
- [ ] update the entotyHelper to return all different stores. That way we do not need to retype all this things.