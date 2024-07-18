import React, { ElementRef, useEffect, useRef } from "react";

import './Modal.css'


export function DetailsModal<T>({ openModal, closeModal, title, data, renderFn, loading }: {
  data: Array<T>;
  title?: string;
  openModal: boolean;
  loading: boolean;
  closeModal: () => void;
  renderFn: (item: T) => React.ReactNode;
}) {
  const ref = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="dialog"
    >
      <div className="modal">
        {title ? <h2 className="modalTitle">{title}</h2> : null}
        {loading ? "Loading..." :
          <ul className="modalContent">
            {data.map(renderFn)}
          </ul>
        }
        <button onClick={closeModal} className="modalFooter">
          Close
        </button>
      </div>
    </dialog >
  );
}
