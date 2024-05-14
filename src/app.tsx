import styles from './css/app.module.scss'
import Lyrics from './components/Lyrics';
const react = Spicetify.React;

function render() {
    return react.createElement(App, { title: "Lyrixed" });
}

class App extends react.Component {
    render() {
        return react.createElement(
            'div',
            { className: styles.container },
            react.createElement(
                'div',
                { className: styles.lyrics_container },
                react.createElement(
                    'div',
                    { className: styles.lyrics },
                    react.createElement(Lyrics, null)
                )
            )
        );
    }
}

export default App;