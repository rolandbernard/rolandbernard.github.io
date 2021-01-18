
import { html } from '../build-util.js';

import { htmlTemplate } from '../html-template.js';

export function homeView(lang = 'en') {
    return htmlTemplate('Page not found', html`
        <style>
            .main-info-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .main-info {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                position: relative;
            }
            .main-info-image {
                flex: 0 0 auto;
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                object-fit: cover;
                box-shadow: var(--shadow-small);
                margin: 1rem;
            }
            @media (max-width: 500px) {
                .main-info {
                    flex-direction: column;
                }
            }
            .main-info-text {
                margin: 1rem;
                text-align: center;
            }
            .main-info-name {
                font-family: Roland;
                font-size: 2.25rem;
                font-weight: bold;
            }
            .main-info-desc {
                font-family: OpenSans;
                font-size: 1.25rem;
            }
            .home-divider {
                position: absolute;
                bottom: -1rem;
                width: 80%;
                border-color: var(--primary);
            }
        </style>
        <div>
            <div class="main-info-wrap">
                <div class="main-info">
                    <img class="main-info-image" src="profile.jpg" />
                    <div class="main-info-text">
                        <div class="main-info-name">Roland Bernard</div>
                        <div class="main-info-desc">${{
                            'en': 'Software Developer & Computer Science Student.',
                            'de': 'Software-Entwickler & Informatik-Student.',
                            'it': 'Sviluppatore di software e studente di informatica.',
                        }[lang]}</div>
                    </div>
                    <hr class="home-divider" />
                </div>
            </div>
        </div>
    `, lang);
}
