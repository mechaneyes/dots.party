const Nudge = ({ fader }) => {
  return (
    <>
      <div className={`${!fader ? "nudge nudge--not-visible" : "nudge"}`}>
        <div className="nudge_inner">
          <button className="enter">
            keep
            <br />
            tapping
          </button>
        </div>
      </div>
    </>
  );
};

export default Nudge;
