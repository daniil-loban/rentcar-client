import React from 'react'
import classes from './main.css'

const Main = () => {
  return (
    <div className={classes.poster}>
      <div className={classes["stm-template-car_rental"]}>
        <div className={classes.baloon}>
          <div className={classes.stm_text_baloon}>
            <div className={classes.inner}>
                    
              <h2><span style={{color: '#ffffff', fontSize: '36pt'}}>5-50%</span></h2>
              <h2><span style={{color: '#273f44'}}>СКИДКА</span></h2>
              <h4>При аренде авто от 3-х суток и более</h4>
              
            </div>
            <i className={classes["stm-rental-baloon_tail"]}></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
