Redux Principles
----------------
- Single Source of truth called store
- State is read only and only changed by dispatching actions
- Changes are made using pure functions called reducers

What should not go in the Store?
-------------------------------
- Unshared state
- Angular Form state
- Non-serializable state

Use Reducers to Change State
----------------------------
- set User details property on login
- Toggle a side menu visible property to true on button click
- set successfully retrieved data on component initialization

Checklist: Store
----------------
- Single container for application state
- Interact with that state in an immutable way
- Install the @ngrx/store package
- Organize the application state by feature
- Name the feature slice with the feature name
- Initialize the store using:
    - StoreModule.forRoot(reducer)
    - StoreModule.forFeature('feature', reducer)

Checklist: Action
-----------------
- An Action represents an event
- Define a action for each event worth tracking

Checklist: Reducer
------------------
- Responds to dispatched actions
- Replaces the state tree with new state
- Build a reducer function (often one or more per feature)
- Implement as a switch with a case per action
- Spread the state as needed

Checklist: Dispatching an Action
--------------------------------
- Often done in response to a user action or an operation
- Inject the Store in the constructor
- Call the dispatch method of the store
- Pass in the action to dispatch
- Passed to all the reducers

Checklist: Subscribing to the Store
-----------------------------------
- Often done in the ngOnInit lifecycle hook
- Inject the store in the constructor
- Use the store's select operator, passing in the desired slice of state
- Receives notifications when the state changes

Checklist: Developer tools and Debugging
-----------------------------
- Install the Redux Devtools Chrome Extension
- npm install @ngrx/store-devtools package
- Inspect the action logs
- Visualize state tree
- Time travel debugging


Benefits of Effects
-------------------
- Keep components pure
- Isolate side effects
- Easier to test

RxJs Operators
--------------
switchMap - Cancels the current subscription/request and cause race condition 
Use get requests or cancelable requests like searches

concatMap - Runs subscriptions/requests in order and is less performant
Use get, post and put requests when order is important

mergeMap - Runs subscriptions/requests in parallel
Use for put, post and delete methods when order is not important

exhaustMap - Ignores all subsequent subscriptions/requests until it completes
Use for login when you do want more requests until the initial one is complete









