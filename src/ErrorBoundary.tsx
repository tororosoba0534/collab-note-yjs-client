import React, { ErrorInfo, ReactNode } from "react";
import config from "./config";
import { error2String } from "./utils/errorHandlings";

/**
 * 子要素でエラーが発生した際に取得し、その情報をコンソールログに出力する
 * エラーが発生したことはユーザーに知らせる
 */
export class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }
  static getDerivedStateFromError(): { hasError: boolean } {
    console.log("getDerivedStatefromErrorがよばれました。");
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error);
    console.log(errorInfo);
    this.setState({ errorMessage: error2String(error) });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col justify-center items-center gap-7">
          <div className="text-2xl">ERROR THROWN:</div>
          <div className="px-5 text-center">{this.state.errorMessage}</div>
          <a
            href={config.client.URL}
            className="block w-52 h-9 text-lg rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center px-2 py-1 cursor-pointer"
          >
            Go back HOME
          </a>

          <a
            href="https://github.com/tororosoba0534/collab-note-yjs-client"
            target="_blank"
            className="block w-52 h-9 text-lg rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center px-2 py-1 cursor-pointer"
          >
            View source code
          </a>
        </div>
      );
    }
    return <>{this.props.children}</>;
  }
}
