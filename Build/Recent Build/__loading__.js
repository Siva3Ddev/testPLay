// // pc.script.createLoadingScreen(function (app) {
// //     var showSplash = function () {
// //         // splash wrapper
// //         var wrapper = document.createElement('div');
// //         wrapper.id = 'application-splash-wrapper';
// //         document.body.appendChild(wrapper);

// //         // splash
// //         var splash = document.createElement('div');
// //         splash.id = 'application-splash';
// //         wrapper.appendChild(splash);
// //         splash.style.display = 'none';

// //         var logo = document.createElement('img');
// //         logo.src = 'https://playcanvas.com/static-assets/images/play_text_252_white.png';
// //         splash.appendChild(logo);
// //         logo.onload = function () {
// //             splash.style.display = 'block';
// //         };

// //         var container = document.createElement('div');
// //         container.id = 'progress-bar-container';
// //         splash.appendChild(container);

// //         var bar = document.createElement('div');
// //         bar.id = 'progress-bar';
// //         container.appendChild(bar);

// //     };

// //     var hideSplash = function () {
// //         var splash = document.getElementById('application-splash-wrapper');
// //         splash.parentElement.removeChild(splash);
// //     };

// //     var setProgress = function (value) {
// //         var bar = document.getElementById('progress-bar');
// //         if(bar) {
// //             value = Math.min(1, Math.max(0, value));
// //             bar.style.width = value * 100 + '%';
// //         }
// //     };

// //     var createCss = function () {
// //         var css = [
// //             'body {',
// //             '    background-color: #283538;',
// //             '}',
// //             '',
// //             '#application-splash-wrapper {',
// //             '    position: absolute;',
// //             '    top: 0;',
// //             '    left: 0;',
// //             '    height: 100%;',
// //             '    width: 100%;',
// //             '    background-color: #283538;',
// //             '}',
// //             '',
// //             '#application-splash {',
// //             '    position: absolute;',
// //             '    top: calc(50% - 28px);',
// //             '    width: 264px;',
// //             '    left: calc(50% - 132px);',
// //             '}',
// //             '',
// //             '#application-splash img {',
// //             '    width: 100%;',
// //             '}',
// //             '',
// //             '#progress-bar-container {',
// //             '    margin: 20px auto 0 auto;',
// //             '    height: 2px;',
// //             '    width: 100%;',
// //             '    background-color: #1d292c;',
// //             '}',
// //             '',
// //             '#progress-bar {',
// //             '    width: 0%;',
// //             '    height: 100%;',
// //             '    background-color: #f60;',
// //             '}',
// //             '',
// //             '@media (max-width: 480px) {',
// //             '    #application-splash {',
// //             '        width: 170px;',
// //             '        left: calc(50% - 85px);',
// //             '    }',
// //             '}'
// //         ].join('\n');

// //         var style = document.createElement('style');
// //         style.type = 'text/css';
// //         if (style.styleSheet) {
// //             style.styleSheet.cssText = css;
// //         } else {
// //             style.appendChild(document.createTextNode(css));
// //         }

// //         document.head.appendChild(style);
// //     };

// //     createCss();
// //     showSplash();

// //     app.on('preload:end', function () {
// //         app.off('preload:progress');
// //     });
// //     app.on('preload:progress', setProgress);
// //     app.on('start', hideSplash);
// // });


// pc.script.createLoadingScreen(function (app) {
//     var showSplash = function () {
//         var wrapper = document.createElement('div');
//         wrapper.id = 'application-splash-wrapper';
//         document.body.appendChild(wrapper);

//         var splash = document.createElement('div');
//         splash.id = 'application-splash';
//         wrapper.appendChild(splash);

//         splash.innerHTML = `
//             <div>
//                 <p>l</p>
//                 <p>o</p>
//                 <p>a</p>
//                 <p>d</p>
//                 <p>i</p>
//                 <p>n</p>
//                 <p>g</p>
//             </div>
//         `;

//         var style = document.createElement('style');
//         style.type = 'text/css';
//         style.innerHTML = `
//             :root {
//                 --effect: hover 1s linear infinite;
//             }
//             * {
//                 margin: 0;
//             }

//             body {
//                 display: flex;
//                 width: 100vw;
//                 height: 100vh;
//                 background: black;
//                 align-items: center;
//                 justify-content: center;
//             }

//             div {
//                 text-align: center;
//             }

//             p {
//                 display: inline-block;
//                 text-transform: uppercase;
//                 text-align: center;
//                 font-size: 4em;
//                 font-family: arial;
//                 font-weight: 600;
//                 transform: scale(.5);
//                 color: #121212;
//                 -webkit-text-stroke: 2px gray;
//             }

//             p:nth-child(1) {
//                 animation: var(--effect);
//             }

//             p:nth-child(2) {
//                 animation: var(--effect) .125s;
//             }

//             p:nth-child(3) {
//                 animation: var(--effect) .25s;
//             }

//             p:nth-child(4) {
//                 animation: var(--effect) .375s;
//             }

//             p:nth-child(5) {
//                 animation: var(--effect) .5s;
//             }

//             p:nth-child(6) {
//                 animation: var(--effect) .675s;
//             }

//             p:nth-child(7) {
//                 animation: var(--effect) .75s;
//             }

//             @keyframes hover {
//                 0% {
//                     transform: scale(.5);
//                     color: #121212;
//                     -webkit-text-stroke: 2px gray;
//                 }

//                 20% {
//                     transform: scale(1);
//                     color: pink;
//                     -webkit-text-stroke: 3px red;
//                     filter: drop-shadow(0 0 1px black)drop-shadow(0 0 1px black)drop-shadow(0 0 3px red)drop-shadow(0 0 5px red)hue-rotate(10turn);
//                 }

//                 50% {
//                     transform: scale(.5);
//                     color: #121212;
//                     -webkit-text-stroke: 2px gray;
//                 }
//             }
//         `;
//         splash.appendChild(style);
//     };

//     var hideSplash = function () {
//         var splash = document.getElementById('application-splash-wrapper');
//         splash.parentElement.removeChild(splash);
//     };

//     showSplash();

//     app.on('preload:end', function () {
//         app.off('preload:progress');
//     });
//     app.on('start', hideSplash);
// });
pc.script.createLoadingScreen(function (app) {
    var showSplash = function () {
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);

        splash.innerHTML = `
            <h1 id="loading-text">
                <span class="let1">l</span>  
                <span class="let2">o</span>  
                <span class="let3">a</span>  
                <span class="let4">d</span>  
                <span class="let5">i</span>  
                <span class="let6">n</span>  
                <span class="let7">g</span>  
            </h1>
        `;

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            html, body {
                height: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                font-size: 100%;
                /*background: #191a1a;*/
                background: transparent;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #application-splash-wrapper {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            
            #loading-text {
                position: absolute;
                /*top: 50%;*/
                top: 40%;
                left: 50%;
                transform: translate(-50%, -50%);
                margin: 0;
                padding: 0;
                font-family: 'Arial Narrow', sans-serif;
                font-weight: 100;
                font-size: 1.1em;
                color: #a3e1f0;
            }
            h1 {
                margin: 0;
                padding: 0;
                font-family: 'Arial Narrow', sans-serif;
                font-weight: 100;
                font-size: 1.1em;
                color: #a3e1f0;
            }

            span {
                position: relative;
                top: 0.63em;  
                display: inline-block;
                text-transform: uppercase;  
                opacity: 0;
                transform: rotateX(-90deg);
            }

            .let1 {
                animation: drop 1.2s ease-in-out infinite;
                animation-delay: 1.2s;
            }

            .let2 {
                animation: drop 1.2s ease-in-out infinite;
                animation-delay: 1.3s;
            }

            .let3 {
                animation: drop 1.2s ease-in-out infinite;
                animation-delay: 1.4s;
            }

            .let4 {
                animation: drop 1.2s ease-in-out infinite;
                animation-delay: 1.5s;
            }

            .let5 {
                animation: drop 1.2s ease-in-out infinite;
                animation-delay: 1.6s;
            }

            .let6 {
                animation: drop 1.2s ease-in-out infinite;
                animation-delay: 1.7s;
            }

            .let7 {
                animation: drop 1.2s ease-in-out infinite;
                animation-delay: 1.8s;
            }

            @keyframes drop {
                10% {
                    opacity: 0.5;
                }
                20% {
                    opacity: 1;
                    top: 3.78em;
                    transform: rotateX(-360deg);
                }
                80% {
                    opacity: 1;
                    top: 3.78em;
                    transform: rotateX(-360deg);
                }
                90% {
                    opacity: 0.5;
                }
                100% {
                    opacity: 0;
                    top: 6.94em
                }
            }
        `;
        splash.appendChild(style);
    };

    var hideSplash = function () {
        var splash = document.getElementById('application-splash-wrapper');
        splash.parentElement.removeChild(splash);
    };

    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('start', hideSplash);
});
