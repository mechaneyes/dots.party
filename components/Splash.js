import { useState } from 'react'

const Splash = () => {
  const [firstLoad, setFirstLoad] = useState(true);

  return (
    <>
      {firstLoad ? (
        <div className="doorbell">
          <div className="doorbell_inner">
            <div className="dot dot--top-left"></div>
            <div className="dot dot--top-right"></div>

            <button className="enter" onClick={() => setFirstLoad(false)}>
              tap + tap some more
            </button>
            <div className="dot dot--bottom-left"></div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Splash