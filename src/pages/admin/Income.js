// import packages
import { useState, useEffect } from "react";
import toRupiah from "@develoka/angka-rupiah-js";

// import component

// import assets
import cssModules from "../../assets/css/Income.module.css";
import check from "../../assets/img/check.svg";
import cancel from "../../assets/img/cancel.svg";
import otw from "../../assets/img/otw.svg";
import noincome from "../../assets/img/noincome.svg";

// import config
import { API } from "../../config/api";

function Income() {
  const [income, setIncome] = useState([]);
  const [payModal, setPaymodal] = useState(null);

  const getIncome = async () => {
    try {
      const response = await API.get("/incomes");

      setIncome(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (transId, status) => {
    try {
      await API.patch(`/transaction/${transId}/${status}`);

      getIncome();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (img) => {
    const modal = (
      <div
        className={cssModules.modalPayment}
        onClick={() => setPaymodal(null)}
      >
        <img src={img} alt="Payment Proof" />
      </div>
    );

    setPaymodal(modal);
  };

  useEffect(() => {
    getIncome();
  }, []);

  return (
    <>
      {payModal ? payModal : <></>}

      <div className={cssModules.incomeBody}>
        {income.length !== 0 ? (
          <>
            <h1>Income Transaction</h1>
            <table>
              <thead>
                <tr>
                  <th className={cssModules.five}>No</th>
                  <th className={cssModules.fifteen}>Name</th>
                  <th className={cssModules.twenty}>Address</th>
                  <th className={cssModules.ten}>Post Code</th>
                  <th className={cssModules.sfive}>Payment</th>
                  <th className={cssModules.sfive}>Income</th>
                  <th className={cssModules.fifteen}>Status</th>
                  <th className={cssModules.fifteen}>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* set data looping */}
                {income?.map((item, index) => (
                  <tr key={index}>
                    <td className={cssModules.numbers}>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td className={cssModules.postal}>{item.postcode}</td>
                    <td className={cssModules.payProof}>
                      <img
                        src={item.attach}
                        alt="payproof"
                        style={{
                          width: "100%",
                          height: "auto",
                          cursor: "pointer",
                        }}
                        onClick={() => showModal(item.attach)}
                      />
                    </td>
                    <td className={cssModules.income}>
                      {toRupiah(item.transaction.total, {
                        formal: false,
                        floatingPoint: 0,
                      })}
                    </td>
                    <td
                      style={{
                        color:
                          item.transaction.status === "process"
                            ? "#FF9900"
                            : item.transaction.status === "otw"
                            ? "#00D1FF"
                            : item.transaction.status === "cancel"
                            ? "#E83939"
                            : "#78A85A",
                      }}
                      className={cssModules.status}
                    >
                      {item.transaction.status === "process" ? (
                        <>Waiting to Approve</>
                      ) : item.transaction.status === "otw" ? (
                        <>On The Way</>
                      ) : item.transaction.status === "cancel" ? (
                        <>Cancel</>
                      ) : (
                        <>Success</>
                      )}
                    </td>
                    <td className={cssModules.actionBtn}>
                      {item.transaction.status === "process" ? (
                        <div>
                          <button
                            className={cssModules.cancelBtn}
                            onClick={() =>
                              updateStatus(item.transaction.id, "cancel")
                            }
                          >
                            Cancel
                          </button>
                          <button
                            className={cssModules.approveBtn}
                            onClick={() =>
                              updateStatus(item.transaction.id, "otw")
                            }
                          >
                            Approve
                          </button>
                        </div>
                      ) : item.transaction.status === "otw" ? (
                        <img
                          src={otw}
                          alt="otewe"
                          style={{ height: "1.75rem", cursor: "pointer" }}
                          onClick={() =>
                            updateStatus(item.transaction.id, "success")
                          }
                        />
                      ) : item.transaction.status === "cancel" ? (
                        <img src={cancel} alt="Cancel" />
                      ) : (
                        <img src={check} alt="Success" />
                      )}
                    </td>
                  </tr>
                ))}
                {/* end data looping */}
              </tbody>
            </table>
          </>
        ) : (
          <div className={cssModules.noIncome}>
            <img src={noincome} alt="No Income" />
          </div>
        )}
      </div>
    </>
  );
}

export default Income;
