import styles from './css/app.module.scss'
import React, { useEffect } from 'react'
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
