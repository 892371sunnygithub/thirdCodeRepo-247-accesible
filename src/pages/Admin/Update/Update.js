import React from "react";
import "./update.scss";
import { useDropzone } from "react-dropzone";
import {
  UploadIcon,
  ConfirmFile,
  AccessibilityIcon,
  OrderStepIcon,
  CreditIcons,
  PaymentIcon,
  InvoiceIcon1,
  InfoIcon,
  Question,
  UploadFileNew,
  CurrentWalletIcon,
  DollarRounded,
  OrderSuccess,
  SharePoint,
  OneDrive,
  GoogleDrive,
} from "assets/images";
import Button from "components/Button";
import { Col, Row } from "react-bootstrap";
import Input from "components/inputField";
import SelectBox from "components/SelectBox/SelectBox";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ConfirmFileTable from "./ConfirmFileTable";
import OrderInformationFileTable from "./OrderInformationFileTable";

const UploadSteps = () => {
  return (
    <nav aria-label="stepMenu" className="upload_steps_wrapper d-table mx-auto">
      <ul className="upload_steps">
        <li className="active_step">
          <div className="steps_icon_box">
            <UploadIcon aria-hidden="true" focusable="false" />
          </div>
          <h6>Upload</h6>
        </li>
        <li className="fill_active_step">
          <div className="steps_icon_box">
            <ConfirmFile aria-hidden="true" focusable="false" />
          </div>
          <h6>Confirm File</h6>
        </li>
        <li>
          <div className="steps_icon_box">
            <AccessibilityIcon aria-hidden="true" focusable="false" />
          </div>
          <h6>Accessibility</h6>
        </li>
        <li>
          <div className="steps_icon_box">
            <OrderStepIcon aria-hidden="true" focusable="false" />
          </div>
          <h6>Order</h6>
        </li>
        <li>
          <div className="steps_icon_box">
            <PaymentIcon aria-hidden="true" focusable="false" />
          </div>
          <h6>Payment</h6>
        </li>
        <li>
          <div className="steps_icon_box">
            <InvoiceIcon1 aria-hidden="true" focusable="false" />
          </div>
          <h6>Invoice</h6>
        </li>
      </ul>
    </nav>
  );
};

const UploadFile = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <div className="customCard upload_File_Block">
      <h2 className="mainTitle">Select File</h2>
      <div className="upload-area text-center mt-4">
        <section className="drop_zone">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />

            <span className="uploadicon">
              <UploadFileNew />
            </span>
            <h4>
              <span>Upload a file</span> or drag and drop
            </h4>
            <Button
              title={"Select File"}
              className={"button--blue mx-auto my-4 "}
            />
            <p>Or upload using</p>
            <ul
              className="upload-menus d-flex align-items-center justify-content-center"
              aria-label=""
            >
              <li>
                <button className="upload-buttons">
                  <SharePoint />
                </button>
              </li>
              <li>
                <button className="upload-buttons">
                  <OneDrive />
                </button>
              </li>
              <li>
                <button className="upload-buttons">
                  <GoogleDrive />
                </button>
              </li>
            </ul>
          </div>

          <ul className="uploaded_files" aria-label="Upload Files">
            {files}
          </ul>
        </section>
      </div>
      <div className="form-buttons d-flex align-items-center justify-content-end pt-4">
        <Button title={"Back"} className={"button--border"} />
        <Button title={"Next"} className={"button--blue ms-3"} />
      </div>
    </div>
  );
};

const ConfirmUploadFile = () => {
  return (
    <div className="customCard confirm_File_Block">
      <h2 className="mainTitle">Confirm File</h2>
      <div className="d-block">
        <ConfirmFileTable />
      </div>

      <div className="form-buttons d-flex align-items-center justify-content-end pt-4">
        <Button title={"Back"} className={"button--border"} />
        <Button title={"Next"} className={"button--blue ms-3"} />
      </div>
    </div>
  );
};

let values = ["1", "2", "3", " jdskjksdj", "dsjkjdksjd"];
let label = "What Compliance Level do you want to meet?";

const AccessibilityFile = () => {
  return (
    <div className="customCard accessibility_File_Block">
      <h2 className="mainTitle">Accessibility Requirement</h2>
      <div className="form-area mt-4">
        <Row>
          <Col sm={6}>
            <SelectBox props={values} label={label} />
          </Col>

          <Col sm={6}>
            <Input
              type="text"
              label="Additional Instructions (Optional):"
              required={false}
              ErrorLabel={""}
              name=""
              value={""}
            />
          </Col>

          <Col md={12}>
            <div className="inputRow ">
              <div className="customCheckbox">
                <input
                  type="checkbox"
                  id="contrast_Checkbox"
                  name="contrast_Checkbox"
                />
                <label htmlFor="contrast_Checkbox" className="mt-0 mb-0">
                  Please confirm that you would like 247 Accessibility Documents
                  to change the font color to meet color contrast ratio as
                  specified under WCAG 2.0 - Level AA compliance.
                </label>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <h2 className="mainTitle mt-2">Additional Services (Optional)</h2>
      <div className="form-area-2 mt-4">
        <Row>
          <Col md={12}>
            <div className="inputRow ">
              <div className="customCheckbox d-flex align-items-center">
                <input
                  type="checkbox"
                  id="extended_alt_Checkbox"
                  name="extended_alt_Checkbox"
                />
                <label htmlFor="extended_alt_Checkbox" className="mt-0 mb-0 ">
                  Do you want extended alt?
                </label>

                <OverlayTrigger
                  key="right"
                  placement="right"
                  trigger="hover"
                  overlay={
                    <Tooltip id={`tooltip-right`} className="tip-content">
                      <h4>Extended Alt </h4>
                      <p>
                        Lorem ipsum, or lipsum as it is sometimes known, is
                        dummy text used in laying out print, graphic or web
                        designs.
                      </p>
                    </Tooltip>
                  }
                >
                  <span className="tooltip_icon">
                    <InfoIcon aria-hidden="true" focusable="false" />
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div className="inputRow ">
              <div className="customCheckbox d-flex align-items-center">
                <input
                  type="checkbox"
                  id="table_summary_Checkbox"
                  name="table_summary_Checkbox"
                />
                <label htmlFor="table_summary_Checkbox" className="mt-0 mb-0">
                  Do you want table summary?{" "}
                </label>
                <OverlayTrigger
                  key="right"
                  trigger="hover"
                  placement="right"
                  overlay={
                    <Tooltip id={`tooltip-right`} className="tip-content">
                      <h4>Table Summary </h4>
                      <p>
                        Lorem ipsum, or lipsum as it is sometimes known, is
                        dummy text used in laying out print, graphic or web
                        designs.
                      </p>
                    </Tooltip>
                  }
                >
                  <span className="tooltip_icon">
                    <Question aria-hidden="true" focusable="false" />
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="form-buttons d-flex align-items-center justify-content-end pt-4">
        <Button title={"Back"} className={"button--border"} />
        <Button title={"Next"} className={"button--blue ms-3"} />
      </div>
    </div>
  );
};

const OrderInformationFile = () => {
  return (
    <div className="customCard orderInfo_File_Block">
      <h2 className="mainTitle">Order Information </h2>
      <div className="order-info-table">
        <OrderInformationFileTable />
      </div>

      <div className="orderInfoFooter">
        <div className="acc_note">
          <h4>Note:</h4>
          <p>
            If you have opted for any Additional Services, this cost will be
            added based on number of extended alt text and table summaries
            needed, at the time of delivery.
          </p>
        </div>

        <div className="form-buttons d-flex align-items-center justify-content-end pt-4">
          <Button title={"Back"} className={"button--border"} />
          <Button title={"Next"} className={"button--blue ms-3"} />
        </div>
      </div>
    </div>
  );
};

const PaymentFile = () => {
  return (
    <div className="customCard payment_File_Block">
      <h2 className="mainTitle">Payment</h2>
      <div className="form-area mt-4">
        <Row>
          <Col md={12}>
            <div className="radioButtonGroup d-flex align-items-start">
              <div className="customCheckbox radioButton">
                <input type="radio" id="Creditcard" name="card-group" checked />
                <label htmlFor="Creditcard">Credit Card</label>
              </div>

              <div className="customCheckbox radioButton ms-4">
                <input type="radio" id="bywallet" name="card-group" />
                <label htmlFor="bywallet">Pay with Wallet</label>
              </div>
            </div>
          </Col>
        </Row>

        <div className="creditCard-Block mt-5">
          <Row>
            <Col md={12}>
              <div className="inputRow">
                <label>Pay using credit card</label>
                <div className="paymentMethods mt-3">
                  <img
                    src={CreditIcons}
                    alt="Payment Methods"
                    className="img-fluid"
                  />
                </div>
              </div>
            </Col>
            <Col md={6}>
              <Input
                type="text"
                label="Card Number:"
                required={false}
                ErrorLabel={""}
                name=""
                value={""}
              />
            </Col>
            <Col md={6}>
              <Input
                type="text"
                label="Card Holder Name:"
                required={false}
                ErrorLabel={""}
                name=""
                value={""}
              />
            </Col>
            <Col md={6}>
              <Input
                type="text"
                label="Expire Date:"
                required={false}
                ErrorLabel={""}
                name=""
                value={""}
              />
            </Col>
            <Col md={6}>
              <Input
                type="text"
                label="CVV:"
                required={false}
                ErrorLabel={""}
                name=""
                value={""}
              />
            </Col>
          </Row>
        </div>

        <div className="WalletPay mt-5">
          <Row>
            <Col md={"12"}>
              <div className="walletCard-Wrapper mb-4">
                <Row className="align-items-center">
                  <Col lg={"8"}>
                    <div className="walletCardinner d-flex align-items-start">
                      <div className="walletCard walletCard-1 d-flex align-items-center">
                        <span class="wcardIcon">
                          <CurrentWalletIcon
                            aria-hidden="true"
                            focusable="false"
                          />
                        </span>
                        <span class="wcardPrice">
                          <h4>$1458.00</h4>
                          <p>Current Wallet Balance</p>
                        </span>
                      </div>

                      <div className="walletCard walletCard-2 d-flex align-items-center ms-5 ps-5 amount-success">
                        <span class="wcardIcon">
                          <DollarRounded aria-hidden="true" focusable="false" />
                        </span>
                        <span class="wcardPrice">
                          <h4>$1458.00</h4>
                          <p>Payable Amount</p>
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col lg={"4"}>
                    <Button
                      title={"Add Credit To  Wallet"}
                      className={"button--blue ms-auto"}
                    />
                  </Col>
                </Row>
              </div>
            </Col>

            <Col md={12}>
              <span className="error-msg mb-4">
                Please Note that your <b> payable amount</b> is more than{" "}
                <b>Current wallet Amount</b>. Firstly <b>ADD</b> more amount in
                wallet.
              </span>
            </Col>
          </Row>
        </div>

        <Row>
          {/* <Col md={12}>
            <div className="inputRow ">
              <div className="customCheckbox d-flex align-items-center">
                <input type="checkbox" id="confirm-accessibility" name="" />
                <label htmlFor="confirm-accessibility" className="mt-0 mb-0 ">
                  Please confirm that you would like 247 Accessibility Documents
                  to change the font color to meet color contrast ratio as
                  specified under WCAG 2.0 - Level AA compliance.
                </label>
              </div>
            </div>
          </Col> */}

          <Col md={12}>
            <div className="acc_note">
              <h4>Note:</h4>
              <p>Based on Type of user and volume - Rates will vary.</p>
              <p>
                If you have used background or layered images, 247 Accessible
                Documents would be unable to manipulate them.
              </p>
            </div>
          </Col>
          <div className="form-buttons d-flex align-items-center justify-content-end pt-4">
            <Button title={"Back"} className={"button--border"} />
            <Button title={"Make Payment"} className={"button--blue ms-3"} />
          </div>
        </Row>
      </div>
    </div>
  );
};

const InvoiceFile = () => {
  return (
    <div className="customCard orderBlock">
      <div className="orderSuccessful">
        <figure className="success-icon">
          <OrderSuccess aria-hidden="true" focusable="false" />
        </figure>
        <h3>Order Successful</h3>
        <span>Invoice No.: GB8564829403</span>
        <p>We will send you an email when the file is ready for delivery.</p>
        <div className="order-buttons d-flex align-items-center justify-content-center mt-2 pt-0">
          <Button title={"View Invoice"} className={"button--border"} />
          <Button title={"Download Invoice"} className={"button--blue ms-3"} />
        </div>
      </div>
    </div>
  );
};

const Update = () => {
  return (
    <div className="">
      <UploadSteps />
      <UploadFile />
      <ConfirmUploadFile />
      <AccessibilityFile />
      <OrderInformationFile />
      <PaymentFile />
      <InvoiceFile />
    </div>
  );
};
export default Update;
