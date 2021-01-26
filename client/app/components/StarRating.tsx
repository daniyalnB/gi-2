import React, { useState } from 'react';

function StarRating({count, value, 
    inactiveColor='#ddd',
    size=24,
    activeColor='#f00', onChange}) {

  // short trick 
  //const stars = Array.from({length: count}, () => '🟊');
  const stars = new Array(count).fill('🟊');
  
  // Internal handle change function
  const handleChange = (e, value) => {
    
    const area = e.target.getBoundingClientRect();
    console.log(area,e.clientX, e.clientY);
    
    
    // Check if half/star
    let isHalfStar = e.clientX > area.left && e.clientX < area.left + area.width/2;
    
    if (typeof onChange !== "function") return;
    
    if (!isHalfStar) return onChange(value + 1);
    
    if (isHalfStar) return onChange((value + 1) - 0.5);
  }

  //<i className="fas fa-star-half-alt"></i>
  
  return (
      <div className="rating_2">
        <span 
          style={{ color:"#38ADA2", fontSize:"20px", marginRight: "10px"}}
        >
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
            style={{color: style, width:size, height:size, fontSize: size}}
            onClick={(e)=>handleChange(e, index)}></i>
        )
      })}
     
    </div>
  )
}


const StarRatingDemo: React.FC = () => {
  // Get the rating from a db if required.
  // The value 3 is just for testing.
  const [rating, setRating] = useState(2.5);
  

  const handleChange = (value) => {
    setRating(value);
  }
  
  
  return (
    <>
      <div className="container rating">
        <StarRating 
          count={5}
          size={30}
          value={rating}
          activeColor ={'#ED8A19'}
          inactiveColor={'#ddd'}
          onChange={handleChange}  
        />    
      </div>

    <div className="rating_1">
      <span
        style={{ fontSize: "14px", color: "#B8B8B8"}}
      > 
        (
          <span style={{ color: "#7E7E7E" }}>
            5
          </span> 
            votes, average: 
          <span style={{ color: "#7E7E7E" }}>
            {rating}
          </span> 
            out of 
          <span style={{ color: "#7E7E7E" }}>
            5
          </span>
        ) 
      </span>
      <br />
      <span
        style={{ fontSize: "12px", color: "#B8B8B8"}}
      > 
        You need to be a registered member to rate this.
      </span>
    </div>
    
    </>
  )
}

export default StarRatingDemo;


