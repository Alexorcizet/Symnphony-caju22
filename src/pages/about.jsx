import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import YouTube from 'react-youtube';
import { defaultHeaderBgcolor } from '../services/bg-color.service'
import { createMiniMediaPlayer } from '../services/media-player.service';
import { setHeaderBgcolor } from '../store/app-header.actions';

export const About = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setHeaderBgcolor(defaultHeaderBgcolor))
    }, [])

    return (
        <section className='about'>
            <h1>Symphony App</h1>
            <h2>A spotify clone</h2>
            <p>
                Hello there!
                This app was built as an end to end project in the coding academy bootcamp which began on july 3rd and ended on november 2nd
                it was built by:
                <ul>
                    <li><i class="fa-brands fa-linkedin"></i><a href="linkedin.com/in/alexander-hlebnikov-363a6b221">Alexander Hlebnikov</a></li>
                    <li><i class="fa-brands fa-linkedin"></i><a href="linkedin.com/in/eshel-eyni-71982b220">Eshel Eyni</a></li>
                    <li><i class="fa-brands fa-linkedin"></i><a href="linkedin.com/in/daria-marchashov-42812025a">Daria Marchashov</a></li>
                </ul>
                It was our end project for an amazing course which took us from the basics of JavaScript, css and HTML all the way to React.Js, Vue.js and even Angular.
                <br />
                That was an amazing journey and i hope you will enjoy the app its absolutely free of charge!
            </p>
        </section>
    )
}