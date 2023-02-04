const CentralizedBox = ({children}) => {
    return (
      <div className="w-full h-full b flex gap-2 flex-col items-center justify-center">
        {children}
      </div>
    );
}

export default CentralizedBox;