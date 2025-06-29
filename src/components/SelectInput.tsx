import cx from "classnames";
import React from "react";
import ReactSelect from "react-select";
import "./SelectInput.scss";
import { useAuth } from "../AuthContext";

export interface DefaultOptionType {
  label: string;
  value: string;
}

function SelectInput(
  { label, error, isTransparent = false, isSearchable = false, ...props }: any,
  ref: React.Ref<any>
) {
  const { canEdit } = useAuth();
  return (
    <div className="select">
      {label && <label className="label">{label}</label>}
      <ReactSelect
        {...props}
        ref={ref}
        isSearchable={isSearchable}
        className={cx("select-input", props.className, {
          error: !!error,
          searchable: isSearchable,
        })}
        classNamePrefix="select"
        menuPlacement="auto"
        isDisabled={!canEdit || props.disabled}
      />
      {!!error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default React.forwardRef(SelectInput);
