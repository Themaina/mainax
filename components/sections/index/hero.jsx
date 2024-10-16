// 
import { useState } from 'react';
import Slider from 'react-slick';

import Section from '../../structure/section';
import Container from '../../structure/container';

import space from '../../utils/spacing.util';
import Icon from '../../utils/icon.util';

import HeroBg from '../../blocks/hero.bg/bg-color-1';

import hero from '../../../styles/sections/index/hero.module.scss';
import button from '../../../styles/blocks/button.module.scss';

import content from '../../../content/index/hero.json';

export default function Hero() {

    const [typingStatus, setTypingStatus] = useState('Initializing');

    // Settings for the slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,  // Smooth fade transition
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <Section classProp={`${hero.section}`}>
            <Container spacing={'VerticalXXXL'}>
                <Slider {...settings}>
                    {content.slides.map((slide, index) => (
                        <div key={index} className={hero.slide}>
                            <section>
                                <h1 className={hero.header}>{slide.header.name}</h1>
                                <h1 className={`${hero.header} ${hero.primaryDim}`}>
                                    {slide.header.usp}
                                </h1>
                            </section>
                            <section>
                                <p className={`${hero.primaryBright} subtitle ${space(["verticalLrg"])}`}>
                                    {slide.paragraph}
                                </p>
                            </section>
                            <section>
                                <button
                                    className={`button ${button.primary}`}
                                    onClick={() => window.location = 'mailto:maina@crosstech.ke'}>
                                    {slide.buttons.primary.title}
                                </button>
                                <button
                                    className={`button ${button.secondary} leaveSite`}
                                    onClick={() => window.open("https://wa.me/254797049888/", "_blank")}>
                                    {slide.buttons.secondary.title}
                                </button>
                            </section>
                            <img src={slide.image} alt={slide.header.name} className={hero.image} />
                        </div>
                    ))}
                </Slider>
                <HeroBg theme="bg-color-1" />
            </Container>
        </Section>
    );
}
