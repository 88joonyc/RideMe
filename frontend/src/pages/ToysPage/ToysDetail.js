import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { createBooking } from '../../store/bookings';
import { getReviews } from '../../store/reviews';

import './ToysDetail.css'

export default function Bookings () {
    const dispatch = useDispatch();
    const { toyId } = useParams()
    const bookings = useSelector((state) => state.bookings[toyId])
    const sessionUser = useSelector(state => state.session.user);
    const toy = useSelector((state) => state.toys[toyId])
    const reviews = toy?.Reviews

    const history = useHistory();
    const [startDate, setStart] = useState('')
    const [endDate, setEnd] = useState('')


    useEffect(() => {
        dispatch(getReviews(toyId))
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = sessionUser.id

        const payload = {
            toyId: Number(toyId),
            userId,
            startDate,
            endDate
        }

        //clean this upp!
        // const bookedStart = bookings[0].startDate;

        if (bookings) {
            const bookedEnd = bookings.endDate;
            const bookdate = Date(bookedEnd)
            const start = Date(startDate)
            if (startDate > endDate) return console.error('date error')
            if (startDate > endDate ) {
                dispatch(createBooking(payload))
                window.alert('Booking made!')
                history.go(0)
            } else  return window.alert('date is already booked!')
        } else {
            dispatch(createBooking(payload))
            window.alert('booking made!')
            history.go(0)
        }
    };

    return (
        <>
            {toy?.Images.map(img => {
                return (
                    <div className='img-container'>
                        <img key={img.id} src={img.url} alt='toy car plane'/>
                    </div>
                )
            })}
                <>
                    <div className='top-info-container'>
                        <h2>{toy?.year}</h2>
                        <h2>{toy?.make}</h2>
                        <h2>{toy?.model}</h2>
                        <h2>{toy?.id}</h2>
                    </div>
                    <div className='booking-form'>
                        <form
                            onSubmit={handleSubmit}
                            >
                            <div>{toy?.price}</div>
                            <div className='date-area'>
                                <label
                                    htmlFor='start'
                                    >Start rental</label>
                                <input
                                    type='date'
                                    value={startDate}
                                    onChange={(e) => setStart(e.target.value)}
                                />
                                <label htmlFor='end'>End rental</label>
                                <input
                                    type='date'
                                    value={endDate}
                                    onChange={(e) => setEnd(e.target.value)}
                                />
                                <button className='reserve-button' type='submit'>Reserve</button>
                            </div>
                        </form>
                    </div>
                    <div className='bot-info-container'>
                        <h2>{toy?.description}</h2>
                        <h2>{toy?.year}</h2>
                        <h2>{toy?.make}</h2>
                        <h2>{toy?.model}</h2>
                        <h2>{toy?.id}</h2>
                    </div>
                </>
                    {reviews?.map(review => {
                return (
                    <div className='review-container'>
                        <h1>Review by {`${review.id}`}</h1>
                        <h2>{review?.id}</h2>
                        <h2>{review?.review}</h2>
                        <h2>{review?.stars}</h2>
                        <h2>{review?.userId}</h2>
                    </div>
                )
            })}
        </>
    )
}
