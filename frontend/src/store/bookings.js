import { csrfFetch } from "./csrf";

const SET_BOOKINGS = 'bookings/SET_BOOKINGS'
// const ADD_BOOKING = 'booking/ADD_BOOKING'

const setBookings = (bookings) => ({
    type: SET_BOOKINGS,
    bookings
});

// const addABooking = (booking) => ({
//     type:
// });

export const getBookings = () => async dispatch => {
    const books = await csrfFetch('/api/bookings')
    const bookings = await books.json();

    dispatch(setBookings(bookings))
};

export const createBooking = (payload) => async dispatch => {

    const thisBooking = await csrfFetch('/api/bookings', {
        method: 'POST',
        header: {"Content-Type": 'application/json'},
        body: JSON.stringify(payload)
    });

    const newBooking = await thisBooking.json();

    if (newBooking.ok) dispatch(setBookings(newBooking))
    console.log(newBooking)

    return newBooking;
};

const initialState = {};

const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKINGS:
            const newState = {
                ...state,
            }
            action.bookings.forEach((booking) => {
                newState[booking.id] = booking;
            });

            return newState;
        default:
            return state;
    }
};

export default bookingsReducer;
