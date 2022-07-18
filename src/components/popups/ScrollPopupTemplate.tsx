import { ReactNode, useEffect, useRef, useState } from "react";
import { LoadingCircleSvg } from "../LoadingCircleSvg";
import { BounceArrow } from "../personal/icons/BounceArrow";

const showBounceArrowHandler = (
  submitBtnElm: React.MutableRefObject<HTMLButtonElement | null> | undefined,
  scrollBoxElm: React.MutableRefObject<HTMLDivElement | null>,
  setShownBounceArrow: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  const btnElm = submitBtnElm?.current;
  const boxElm = scrollBoxElm?.current;
  if (!btnElm || !boxElm) return;
  const boxBottom = boxElm.getBoundingClientRect().bottom;
  const submitButtonBottom = btnElm.getBoundingClientRect().bottom;
  setShownBounceArrow(() => {
    return submitButtonBottom < boxBottom ? false : true;
  });
};

export const ScrollPopupTemplate = (props: {
  isLoading: boolean;
  submitMsg: string;
  title: string;
  children: ReactNode;
  handleClose: React.MouseEventHandler<HTMLDivElement> | null;
  submitBtnElm: React.MutableRefObject<HTMLButtonElement | null>;
}) => {
  const [titleHeight, setTitleHeight] = useState(40);
  const [shownBounceArrow, setShownBounceArrow] = useState(false);
  const boxElm = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setTitleHeight(() => {
      if (!props.isLoading && !props.submitMsg) return 40;
      if (props.submitMsg)
        return Math.ceil(props.submitMsg.length / 25) * 24 + 40;
      return 88;
    });
  }, [props.isLoading, props.submitMsg]);

  const showBounceArrowHandlerInner = () => {
    showBounceArrowHandler(props.submitBtnElm, boxElm, setShownBounceArrow);
  };

  useEffect(() => {
    showBounceArrowHandlerInner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("resize", showBounceArrowHandlerInner);

    return () => {
      window.removeEventListener("resize", showBounceArrowHandlerInner);
    };
  });

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-20"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="bg-white rounded-lg  w-72 h-[80%]">
        {props.handleClose ? (
          <div className="relative w-full">
            <div
              className="absolute top-0 right-0 w-5 h-5 hover:font-bold cursor-pointer"
              onClick={props.handleClose}
            >
              X
            </div>
          </div>
        ) : null}
        <div className="p-5 pt-3 w-full h-full">
          <div className="w-full pb-2">
            <div className="text-center text-xl">{props.title}</div>
            {props.isLoading ? (
              <div className="w-full flex flex-row justify-center">
                <span className="w-5 h-5 inline-block">
                  <LoadingCircleSvg />
                </span>
                <span>Now waiting response...</span>
              </div>
            ) : !props.submitMsg ? null : (
              <div className="w-full rounded-md bg-red-400 text-white font-bold py-1 px-2 leading-5">
                {props.submitMsg}
              </div>
            )}
          </div>
          <div
            className="w-full"
            style={{ height: `calc(100% - ${titleHeight}px)` }}
          >
            <div className="w-full h-full flex flex-col p-1 pb-2 rounded-b-3xl rounded-t-sm  border-4 border-gray-500 ">
              <div
                ref={boxElm}
                className="flex-1 overflow-auto"
                onScroll={(e) => {
                  showBounceArrowHandler(
                    props.submitBtnElm,
                    boxElm,
                    setShownBounceArrow
                  );
                }}
              >
                {props.children}
              </div>
            </div>
          </div>
          {!shownBounceArrow ? null : (
            <div className="w-full relative">
              <div className="absolute z-40 w-10 h-10 -top-24 left-1">
                <BounceArrow />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
