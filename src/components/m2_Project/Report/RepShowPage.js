// m2i
import "./RepShowPage.css";
import { useEffect, useState } from 'react';
import { getRep } from '../../../lib/api/report';
import { formatDateZero } from '../../../lib/common/dateCom';
import Alert from "@mui/material/Alert";
import { isEmpty } from "../../../lib/common/isEmpty";

const initData = {prj: {status: "",
                        approval: "",
                        approval_date: "",
                        pl_id: "",
                        number: "",
                        name: "",
                        make_date: "",
                        make_id: "",
                        update_date: "",
                        update_id: "",
                        company_name: "",
                        department_name: "",
                        personincharge_name: "",
                        phone: "",
                        fax: "",
                        email: "",
                        development_period_fr: "",
                        development_period_to: "",
                        scheduled_to_be_completed: "",
                        system_overview: "",
                        development_environment: "",
                        order_amount: 0,
                        planned_work_cost: 0,
                        planned_workload: 0,
                        planned_purchasing_cost: 0,
                        planned_outsourcing_cost: 0,
                        planned_outsourcing_workload: 0,
                        planned_expenses_cost: 0,
                        gross_profit: 0,
                        work_place_kbn: "",
                        work_place: "",
                        customer_property_kbn: "",
                        customer_property: "",
                        customer_environment: "",
                        purchasing_goods_kbn: "",
                        purchasing_goods: "",
                        outsourcing_kbn: "",
                        outsourcing: "",
                        customer_requirement_kbn: "",
                        customer_requirement: "",
                        remarks: ""},
                  rep: {id: "",
                        approval: "",
                        approval_date: "",
                        make_date: "",
                        make_name: "",
                        delivery_date: "",
                        actual_work_cost: "",
                        actual_workload: "",
                        actual_purchasing_cost: "",
                        actual_outsourcing_cost: "",
                        actual_outsourcing_workload: "",
                        actual_expenses_cost: "",
                        gross_profit: "",
                        customer_property_accept_result: "",
                        customer_property_accept_remarks: "",
                        customer_property_used_result: "",
                        customer_property_used_remarks: "",
                        purchasing_goods_accept_result: "",
                        purchasing_goods_accept_remarks: "",
                        outsourcing_evaluate1: "",
                        outsourcing_evaluate_remarks1: "",
                        outsourcing_evaluate2: "",
                        outsourcing_evaluate_remarks2: "",
                        communication_count: "",
                        meeting_count: "",
                        phone_count: "",
                        mail_count: "",
                        fax_count: "",
                        design_changes_count: "",
                        specification_change_count: "",
                        design_error_count: "",
                        others_count: "",
                        improvement_count: "",
                        corrective_action_count: "",
                        preventive_measures_count: "",
                        project_meeting_count: "",
                        statistical_consideration: "",
                        qualitygoals_evaluate: "",
                        total_report: ""},
                    phases: []
                    }

const RepShowPage = (props) => {
  const { prjId } = props;
  const [data, setData] = useState(initData);
  const [message, setMessage] = useState({ kbn: "", msg: "" });

  // ???????????????????????????
  const isNothing = (obj) => {
    return !Object.keys(obj).length;
  }

  // ????????????
  useEffect(() => {
    if (!isEmpty(prjId)) {
      handleGetRep();
    }
  },[prjId]);

  // ??????????????????????????????
  const handleGetRep = async () => {
    try {
      const res = await getRep(Number(prjId));
      const tmpPhases = res.data.phases.map(phase => {
        const tmpPhase = {};
        tmpPhase.id = phase.id;
        tmpPhase.name = phase.name;
        tmpPhase.deliverables = phase.deliverables;
        tmpPhase.review_count = phase.review_count;
        tmpPhase.planned_cost = phase.planned_cost;
        tmpPhase.actual_cost = phase.actual_cost;
        tmpPhase.accept_comp_date = phase.accept_comp_date;
        tmpPhase.ship_number = phase.ship_number;
        return tmpPhase; 
      });
      if(res.data.rep===null || isNothing(res.data.rep)) {
        // ????????????????????????????????????
        setData({
          ...data,
          prj: {status: res.data.prj.status,
                approval: res.data.prj.approval,
                approval_date: res.data.prj.approval_date,
                pl_id: res.data.prj.pl_id,
                number: res.data.prj.number,
                name: res.data.prj.name,
                make_date: res.data.prj.make_date,
                make_id: res.data.prj.make_id,
                update_date: res.data.prj.update_date,
                update_id: res.data.prj.update_id,
                company_name: res.data.prj.company_name,
                department_name: res.data.prj.department_name,
                personincharge_name: res.data.prj.personincharge_name,
                phone: res.data.prj.phone,
                fax: res.data.prj.fax,
                email: res.data.prj.email,
                development_period_fr: res.data.prj.development_period_fr,
                development_period_to: res.data.prj.development_period_to,
                scheduled_to_be_completed: res.data.prj.scheduled_to_be_completed,
                system_overview: res.data.prj.system_overview,
                development_environment: res.data.prj.development_environment,
                order_amount: Number(res.data.prj.order_amount),
                planned_work_cost: Number(res.data.prj.planned_work_cost),
                planned_workload: Number(res.data.prj.planned_workload),
                planned_purchasing_cost: Number(res.data.prj.planned_purchasing_cost),
                planned_outsourcing_cost: Number(res.data.prj.planned_outsourcing_cost),
                planned_outsourcing_workload: Number(res.data.prj.planned_outsourcing_workload),
                planned_expenses_cost: Number(res.data.prj.planned_expenses_cost),
                gross_profit: Number(res.data.prj.gross_profit),
                work_place_kbn: res.data.prj.work_place_kbn,
                work_place: res.data.prj.work_place,
                customer_property_kbn: res.data.prj.customer_property_kbn,
                customer_property: res.data.prj.customer_property,
                customer_environment: res.data.prj.customer_environment,
                purchasing_goods_kbn: res.data.prj.purchasing_goods_kbn,
                purchasing_goods: res.data.prj.purchasing_goods,
                outsourcing_kbn: res.data.prj.outsourcing_kbn,
                outsourcing: res.data.prj.outsourcing,
                customer_requirement_kbn: res.data.prj.customer_requirement_kbn,
                customer_requirement: res.data.prj.customer_requirement,
                remarks: res.data.prj.remarks},
          rep: {...data.rep,
                gross_profit: res.data.prj.order_amount},
          phases: tmpPhases,
        });
      } else {
        // ????????????????????????????????????
        setData({
          ...data,
          prj: {status: res.data.prj.status,
                approval: res.data.prj.approval,
                approval_date: res.data.prj.approval_date,
                pl_id: res.data.prj.pl_id,
                number: res.data.prj.number,
                name: res.data.prj.name,
                make_date: res.data.prj.make_date,
                make_id: res.data.prj.make_id,
                update_date: res.data.prj.update_date,
                update_id: res.data.prj.update_id,
                company_name: res.data.prj.company_name,
                department_name: res.data.prj.department_name,
                personincharge_name: res.data.prj.personincharge_name,
                phone: res.data.prj.phone,
                fax: res.data.prj.fax,
                email: res.data.prj.email,
                development_period_fr: res.data.prj.development_period_fr,
                development_period_to: res.data.prj.development_period_to,
                scheduled_to_be_completed: res.data.prj.scheduled_to_be_completed,
                system_overview: res.data.prj.system_overview,
                development_environment: res.data.prj.development_environment,
                order_amount: Number(res.data.prj.order_amount),
                planned_work_cost: Number(res.data.prj.planned_work_cost),
                planned_workload: Number(res.data.prj.planned_workload),
                planned_purchasing_cost: Number(res.data.prj.planned_purchasing_cost),
                planned_outsourcing_cost: Number(res.data.prj.planned_outsourcing_cost),
                planned_outsourcing_workload: Number(res.data.prj.planned_outsourcing_workload),
                planned_expenses_cost: Number(res.data.prj.planned_expenses_cost),
                gross_profit: Number(res.data.prj.gross_profit),
                work_place_kbn: res.data.prj.work_place_kbn,
                work_place: res.data.prj.work_place,
                customer_property_kbn: res.data.prj.customer_property_kbn,
                customer_property: res.data.prj.customer_property,
                customer_environment: res.data.prj.customer_environment,
                purchasing_goods_kbn: res.data.prj.purchasing_goods_kbn,
                purchasing_goods: res.data.prj.purchasing_goods,
                outsourcing_kbn: res.data.prj.outsourcing_kbn,
                outsourcing: res.data.prj.outsourcing,
                customer_requirement_kbn: res.data.prj.customer_requirement_kbn,
                customer_requirement: res.data.prj.customer_requirement,
                remarks: res.data.prj.remarks},
          rep: {id: res.data.rep.id,
                approval: res.data.rep.approval,
                approval_date: res.data.rep.approval_date,
                make_date: res.data.rep.make_date,
                make_name: res.data.rep.make_name,
                delivery_date: res.data.rep.delivery_date,
                actual_work_cost: res.data.rep.actual_work_cost,
                actual_workload: res.data.rep.actual_workload,
                actual_purchasing_cost: res.data.rep.actual_purchasing_cost,
                actual_outsourcing_cost: res.data.rep.actual_outsourcing_cost,
                actual_outsourcing_workload: res.data.rep.actual_outsourcing_workload,
                actual_expenses_cost: res.data.rep.actual_expenses_cost,
                gross_profit: res.data.rep.gross_profit,
                customer_property_accept_result: res.data.rep.customer_property_accept_result,
                customer_property_accept_remarks: res.data.rep.customer_property_accept_remarks,
                customer_property_used_result: res.data.rep.customer_property_used_result,
                customer_property_used_remarks: res.data.rep.customer_property_used_remarks,
                purchasing_goods_accept_result: res.data.rep.purchasing_goods_accept_result,
                purchasing_goods_accept_remarks: res.data.rep.purchasing_goods_accept_remarks,
                outsourcing_evaluate1: res.data.rep.outsourcing_evaluate1,
                outsourcing_evaluate_remarks1: res.data.rep.outsourcing_evaluate_remarks1,
                outsourcing_evaluate2: res.data.rep.outsourcing_evaluate2,
                outsourcing_evaluate_remarks2: res.data.rep.outsourcing_evaluate_remarks2,
                communication_count: res.data.rep.communication_count,
                meeting_count: res.data.rep.meeting_count,
                phone_count: res.data.rep.phone_count,
                mail_count: res.data.rep.mail_count,
                fax_count: res.data.rep.fax_count,
                design_changes_count: res.data.rep.design_changes_count,
                specification_change_count: res.data.rep.specification_change_count,
                design_error_count: res.data.rep.design_error_count,
                others_count: res.data.rep.others_count,
                improvement_count: res.data.rep.improvement_count,
                corrective_action_count: res.data.rep.corrective_action_count,
                preventive_measures_count: res.data.rep.preventive_measures_count,
                project_meeting_count: res.data.rep.project_meeting_count,
                statistical_consideration: res.data.rep.statistical_consideration,
                qualitygoals_evaluate: res.data.rep.qualitygoals_evaluate,
                total_report: res.data.rep.total_report},
            phases: tmpPhases,
        });
      }
    } catch (e) {
      setMessage({kbn: "error", msg: "???????????????????????????????????????"});
    }
  }

  // null???undefined??????
  const toStr = (v) => {
    if (isEmpty(v)) {
      return "";
    } else {
      return v;
    }
  }
  
  // ????????????
  return (
    <div className="m2i-container">
      { message.kbn && <Alert severity={message.kbn}>{message.msg}</Alert>}

      {/* ?????????????????? */}
      <div className="m2i-sec01">?????????????????????????????????</div>

      <div className="m2i-frame">

        {/* ?????????????????? */}
        <table className="m2i-sec02">
          <tbody>
            <tr>
              <td className="m2i-sec02-ttl1">??????????????????No.</td>
              <td className="m2i-sec02-val1">{toStr(data.prj.number)}</td>
              <td className="m2i-sec02-ttl2">??????</td>
              <td className="m2i-sec02-val2">
                {formatDateZero(data.rep.approval_date, "YYYY???MM???DD???")}
              </td>
            </tr>
            <tr>
              <td className="m2i-sec02-ttl1">?????????????????????</td>
              <td className="m2i-sec02-val1">{toStr(data.prj.name)}</td>
              <td className="m2i-sec02-ttl2">??? ???</td>
              <td className="m2i-sec02-val2">{formatDateZero(data.rep.make_date, "YYYY???MM???DD???") + "???" + toStr(data.rep.make_name)}</td>
            </tr>
            <tr>
              <td className="m2i-sec02-ttl1">????????????</td>
              <td className="m2i-sec02-val1">{formatDateZero(data.prj.development_period_fr, "YYYY???MM???DD???") + " ??? " + formatDateZero(data.prj.development_period_to, "YYYY???MM???DD???")}</td>
              <td className="m2i-sec02-ttl2">??????</td>
              <td className="m2i-sec02-val2">{formatDateZero(data.rep.delivery_date, "YYYY???MM???DD???")}</td>
            </tr>
          </tbody>
        </table>

        {/* ?????????????????? */}
        <table className="m2i-sec03">
          <tbody>
            <tr>
              <td className="m2i-sec03-ttl1">????????????</td>
              <td className="m2i-sec03-val1">{Number(toStr(data.prj.order_amount)).toLocaleString() + " ???"}</td>
              <td className="m2i-sec03-ttl2" rowSpan="2">?????????</td>
              <td className="m2i-sec03-ttl2">?????????</td>
              <td className="m2i-sec03-val2">{Number(toStr(data.rep.actual_work_cost)).toLocaleString() + " ???"}</td>
              <td className="m2i-sec03-ttl3">?????????</td>
              <td className="m2i-sec03-val3">{Number(toStr(data.rep.actual_purchasing_cost)).toLocaleString() + " ???"}</td>
            </tr>
            <tr>
              <td className="m2i-sec03-ttl1">??????</td>
              <td className="m2i-sec03-val1">{Number(toStr(data.rep.gross_profit)).toLocaleString() + " ???"}</td>
              <td className="m2i-sec03-ttl2">?????????</td>
              <td className="m2i-sec03-val2">{Number(toStr(data.rep.actual_outsourcing_cost)).toLocaleString() + " ???"}</td>
              <td className="m2i-sec03-ttl3">??????</td>
              <td className="m2i-sec03-val3">{Number(toStr(data.rep.actual_expenses_cost)).toLocaleString() + " ???"}</td>
            </tr>
          </tbody>
        </table>

        {/* ?????????????????? */}
        <table className="m2i-sec04">
          <tbody>
            <tr>
              <td rowSpan="2" className="m2i-sec04-ttl1">???????????????</td>
              <td className="m2i-sec04-ttl2">????????????</td>
              <td className="m2i-sec04-val2">{toStr(data.rep.customer_property_accept_result)}</td>
              <td className="m2i-sec04-val3">{toStr(data.rep.customer_property_accept_remarks)}</td>
            </tr>
            <tr>
              <td className="m2i-sec04-ttl2">????????????</td>
              <td className="m2i-sec04-val2">{toStr(data.rep.customer_property_used_result)}</td>
              <td className="m2i-sec04-val3">{toStr(data.rep.customer_property_used_remarks)}</td>
            </tr>
            <tr>
              <td className="m2i-sec04-ttl1">?????????</td>
              <td className="m2i-sec04-ttl2">????????????</td>
              <td className="m2i-sec04-val2">{toStr(data.rep.purchasing_goods_accept_result)}</td>
              <td className="m2i-sec04-val3">{toStr(data.rep.purchasing_goods_accept_remarks)}</td>
            </tr>
          </tbody>
        </table>

        {/* ?????????????????? */}
        <table className="m2i-sec05">
          <tbody>
            <tr>
              <td rowSpan="2" className="m2i-sec05-ttl">????????????</td>
              <td className="m2i-sec05-val1">{toStr(data.rep.outsourcing_evaluate1)}</td>
              <td className="m2i-sec05-val2">{toStr(data.rep.outsourcing_evaluate_remarks1)}</td>
            </tr>
            <tr>
              <td className="m2i-sec05-val1">{toStr(data.rep.outsourcing_evaluate2)}</td>
              <td className="m2i-sec05-val2">{toStr(data.rep.outsourcing_evaluate_remarks2)}</td>
            </tr>
          </tbody>
        </table>

        {/* ?????????????????? */}
        <table className="m2i-sec06">
          <tbody>
            <tr>
              <td className="m2i-sec06-ttl">????????????</td>
              <td className="m2i-sec06-val">
                <table className="m2i-phasetbl">
                  <thead>
                    <tr className="m2i-phase-hdtr">
                      <td colSpan="3" className="m2i-phase-th">????????????????????????</td>
                      <td colSpan="2" className="m2i-phase-th">??????</td>
                      <td colSpan="2" className="m2i-phase-th">??????</td>
                    </tr>
                    <tr className="m2i-phase-hdtr">
                      <td className="m2i-phase-name-td m2i-phase-th">??????</td>
                      <td className="m2i-phase-deliverables-td m2i-phase-th">?????????</td>
                      <td className="m2i-phase-reviewcount-td m2i-phase-th">????????????</td>
                      <td className="m2i-phase-planedcost-td m2i-phase-th">??????</td>
                      <td className="m2i-phase-planedcost-td m2i-phase-th">??????</td>
                      <td className="m2i-phase-acceptcompdate-td m2i-phase-th">?????????</td>
                      <td className="m2i-phase-shipnumber-td m2i-phase-th">No.</td>                  
                    </tr>
                  </thead>
                  <tbody>
                    {data.phases ? (
                      data.phases.map((p, i) => 
                        <tr key={"phase-" + i} className="m2i-phase-bdtr">
                          <td className="m2i-phase-name-td">{toStr(p.name)}</td>
                          <td className="m2i-phase-deliverables-td">{toStr(p.deliverables)}</td>
                          <td className="m2i-phase-reviewcount-td">{toStr(p.review_count) + " ???"}</td>
                          <td className="m2i-phase-planedcost-td">{toStr(p.planned_cost) + " ???"}</td>
                          <td className="m2i-phase-actualcost-td">{toStr(p.actual_cost) + " ???"}</td>
                          <td className="m2i-phase-acceptcompdate-td">{formatDateZero(p.accept_comp_date, "YYYY???MM???DD???")}</td>
                          <td className="m2i-phase-shipnumber-td">{toStr(p.ship_number)}</td>                  
                        </tr>
                      )
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

        {/* ?????????????????? */}
        <table className="m2i-sec07">
          <tbody>
            <tr>
              <td rowSpan="4" className="m2i-sec07-ttl1">????????????</td>
              <td className="m2i-sec07-ttl2">?????????????????????????????????</td>
              <td className="m2i-sec07-val1">{Number(toStr(data.rep.communication_count)).toLocaleString() + " ???"}</td>
              <td className="m2i-sec07-val2">
                <div className="m2i-sec07-val2-frame">
                  <div className="m2i-sec07-val2-inner">?????????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val2-val">{toStr(data.rep.meeting_count)}</div>
                </div>
              </td>
              <td className="m2i-sec07-val3">
                <div className="m2i-sec07-val3-frame">
                  <div className="m2i-sec07-val3-inner">??????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val3-val">{toStr(data.rep.phone_count)}</div>
                </div>
              </td>
              <td className="m2i-sec07-val4">
                <div className="m2i-sec07-val4-frame">
                  <div className="m2i-sec07-val4-inner">?????????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val4-val">{toStr(data.rep.mail_count)}</div>
                </div>
              </td>
              <td className="m2i-sec07-val5">
                <div className="m2i-sec07-val5-frame">
                  <div className="m2i-sec07-val5-inner">FAX</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val5-val">{toStr(data.rep.fax_count)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="m2i-sec07-ttl2">???????????????</td>
              <td className="m2i-sec07-val1">{Number(toStr(data.rep.design_changes_count)).toLocaleString() + " ???"}</td>
              <td className="m2i-sec07-val2">
                <div className="m2i-sec07-val2-frame">
                  <div className="m2i-sec07-val2-inner">??????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val2-val">{toStr(data.rep.specification_change_count)}</div>
                </div>
              </td>
              <td className="m2i-sec07-val3">
                <div className="m2i-sec07-val3-frame">
                  <div className="m2i-sec07-val3-inner">????????????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val3-val">{toStr(data.rep.design_error_count)}</div>
                </div>
              </td>
              <td colSpan="2" className="m2i-sec07-val4">
                <div className="m2i-sec07-val4-frame">
                  <div className="m2i-sec07-val4-inner">?????????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val4-val">{toStr(data.rep.others_count)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="m2i-sec07-ttl2">????????????</td>
              <td className="m2i-sec07-val1">{Number(toStr(data.rep.improvement_count)).toLocaleString() + " ???"}</td>
              <td className="m2i-sec07-val2">
                <div className="m2i-sec07-val2-frame">
                  <div className="m2i-sec07-val2-inner">????????????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val2-val">{toStr(data.rep.corrective_action_count)}</div>
                </div>
              </td>
              <td colSpan="3" className="m2i-sec07-val3">
                <div className="m2i-sec07-val3-frame">
                  <div className="m2i-sec07-val3-inner">????????????</div>
                  <div className="m2i-sec07-inner">:</div>
                  <div className="m2i-sec07-val3-val">{toStr(data.rep.preventive_measures_count)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="m2i-sec07-ttl2">????????????????????????????????????</td>
              <td className="m2i-sec07-val1">{toStr(data.rep.project_meeting_count) + " ???"}</td>
              <td colSpan="4" className="m2i-sec07-val2">
              </td>
            </tr>
          </tbody>
        </table>

        {/* ?????????????????? */}
        <table className="m2i-sec08">
          <tbody>
            <tr className="m2i-sec08-r1">
              <td className="m2i-sec08-ttl">???????????????</td>
              <td className="m2i-sec08-val">{toStr(data.rep.statistical_consideration)}</td>
            </tr>
            <tr className="m2i-sec08-r2">
              <td className="m2i-sec08-ttl">?????????????????????</td>
              <td className="m2i-sec08-val">{toStr(data.rep.qualitygoals_evaluate)}</td>
            </tr>
            <tr className="m2i-sec08-r3">
              <td className="m2i-sec08-ttl">????????????</td>
              <td className="m2i-sec08-val">{toStr(data.rep.total_report)}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  );
}
export default RepShowPage;