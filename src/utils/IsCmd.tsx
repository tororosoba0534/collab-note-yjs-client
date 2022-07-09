export class IsCmd {
  static next = (e: React.KeyboardEvent<HTMLElement>): boolean => {
    if (e.key === "Enter") return true;
    return false;
  };

  static up = (e: React.KeyboardEvent<HTMLElement>): boolean => {
    if (e.ctrlKey && e.key === "p") return true;
    if (e.key === "ArrowUp") return true;
    return false;
  };

  static down = (e: React.KeyboardEvent<HTMLElement>): boolean => {
    if (e.ctrlKey && e.key === "n") return true;
    if (e.key === "ArrowDown") return true;
    return false;
  };
}
