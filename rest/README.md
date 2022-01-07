#API v1.0

## Endpoints
- ### +/ContextList
  - +GET : get context lists
  - +POST : save a context list
    - ContextList - an object of context list
- ### +/ContextList/{id}
  - #### {id} : a context list id (1,2,...N)
  - +DELETE : delete a list
- ### +/ContextList/{id}/Context
  - #### {id} : a context list id (1,2,...N)
  - POST : ?
  - GET : get a context list from context lists
    - params:
      - status : new, studied, repeated, unrepeated
      - limit :  quantity of contexts is until the limit value
      - offset : ...
- ### +/ContextList/Context
  - GET : it is the same /ContextList/{id}/Context but a search is in all lists
- ### /ContextList/{contextListId}/Context/{contextId}
    - #### {contextListId} : a context list id (1,2,...N)
    - #### {contextId} : a context id (1,2,...N)
    - POST : attach to a ContextList or detach from a ContextList 
        - params:
            - action : attach, detach
- ### +/Context
    - it is the same /ContextList/Context
- ### +/Context/{id}
    - #### {contextId} : a context id (1,2,...N)
    - +GET : get a context by the id
    - +DELETE : remove a context by the id
- ### +/Context/{contextId}/ContextStatus/{status}
  - #### {contextId} : a context id (1,2,...N)
  - #### {status} : new, studied, repeated
  - +POST : set a new status
- ### + /PartOfSpeech
  - +GET : get parts of speech
- ### + /Lexeme
  - +GET : get lexemes (why ? it needs to limit)
  - +POST : save a expression
    - Lexeme : an object of a expression

## Objects
- Lexeme
- PartOfSpeech

## Sources
- https://simkimsia.com/how-to-restore-database-dumps-for-postgres-in-docker-container/
- 
