const createStore = (initialState, reducer) => {
    let state = initialState;
    const events = {};

    // 구독
    const subscribe = (actionType, eventCallback) => {
        if (!events[actionType]) {
            events[actionType] = [];
        }
        events[actionType].push(eventCallback);
    };

    // 발행
    const publish = (actionType) => {
        if (!events[actionType]) {
            return;
        }
        events[actionType].map((cb) => cb());
    };

    // 상태에 이벤트와 필요한 데이터를 보내는 함수
    const dispatch = (action) => {
        // action에는 type(이벤트), payload(데이터)가 있음
        state = reducer(state, action);
        publish(action.type);
    };

    const getState = () => state;

    return {
        getState,
        subscribe,
        dispatch,
    };
};