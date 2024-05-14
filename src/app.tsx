import styles from './css/app.module.scss'
import React from 'react'
import { Lyrics } from './components/Lyrics';

const App = () => 
  <div className={styles.container}>
    <div className={styles.lyrics_container}>
      <div className={styles.lyrics}>
        <Lyrics />
      </div>
    </div>
  </div>

export default App;
