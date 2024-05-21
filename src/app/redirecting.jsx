const Redirecting = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center fixed inset-0 gap-4 bg-neutral-900/30">
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2 className="text-black">Redirecting</h2>
    </div>
  );
};

export default Redirecting;
