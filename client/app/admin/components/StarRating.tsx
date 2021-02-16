import React, { useState } from 'react';

function StarRating (
    {
      count, value, 
      inactiveColor='#ddd',
      activeColor='#f00', 
      // onChange
    }
  ) {

  const stars = new Array(count).fill('🟊');
  
  const handleChange = (e, value) => {
    
    const area = e.target.getBoundingClientRect();
    console.log(area,e.clientX, e.clientY);
    
    let isHalfStar = e.clientX > area.left && e.clientX < area.left + area.width/2;
    
    if (typeof onChange !== "function") return;
    
    if (!isHalfStar) return onChange(value + 1);
    
    if (isHalfStar) return onChange((value + 1) - 0.5);
  }
  
  return (
      <div className="rating_2">
        <span className="rating-value">
          {value}
        </span>

      {stars.map((s, index) => {
        let style = inactiveColor;
        let className = "star fa fa-star";
        if (index < value) {
          style=activeColor;
        }
        
        // If the index matches the half rating
        // 3 == floor(3.5)
        if (index == Math.floor(value)) {
          if (!Number.isInteger(value)) {
            className = "fa fa-star-half-alt";
          }
        }
                
        return (
          <i className={className}  
            key={index}
            style={{color: style}}
            onClick={(e)=>handleChange(e, index)}></i>
        )
      })}
     
    </div>
  )
}


const StarRatingDemo: React.FC = () => {
  // Get the rating from a db if required.
  // The value 3 is just for testing.
  const [rating, setRating] = useState(4.5);
  

  const handleChange = (value) => {
    setRating(value);
  }
  
  
  return (
    <>
      <div className="container-fluid rating">
        <StarRating 
          count={5}
          value={rating}
          activeColor ={'#ED8A19'}
          inactiveColor={'#ddd'}
          // onChange={handleChange}  
        />    
      </div>

    <div className="rating_1">
      <span className="span-rating-1"> 
        (
          <span className="span-1">
            5
          </span> 
          <span className="span-2">
            votes, average: 
          </span>
          <span className="span-3">
            {rating}
          </span>
          <span className="span-4">
            out of
          </span>  
          <span className="span-5">
            5
          </span>
        ) 
      </span>
      <br />
      <span className="span-rating-2"> 
        You need to be a registered member to rate this.
      </span>
    </div>
    
    </>
  )
}

export default StarRatingDemo;


