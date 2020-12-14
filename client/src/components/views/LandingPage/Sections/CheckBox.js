import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import styles from "./checkBox.module.css";
import Scrollbars from "react-custom-scrollbars";
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: "rgba(35, 49, 86, 0.8)",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const CustomScrollbars = (props) => (
    <Scrollbars
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      {...props}
    />
  );

  const handleToggle = (value) => {
    //누른 것의 Index를 구하고
    const currentIndex = Checked.indexOf(value);
    //전체 Checked된 State에서  현재 누른 Checkbox가 이미 있다면
    const newChecked = [...Checked];

    // State 넣어준다.
    if (currentIndex === -1) {
      newChecked.push(value);
      // 빼주고
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log(newChecked);
    setChecked(newChecked);
    props.handleFilters(newChecked); //선택된 숫자아이디같이 들어간다!
  }; //여기서 부모컴포넌트인 landing page로 값을 전달할수있다!

  const renderCheckboxLists = () =>
    // collapse와 check 박스는 antd디자인에서 가져온것이다!
    props.list &&
    props.list.map((value, index) => (
      <div className={styles.check}>
        <React.Fragment key={index}>
          <Checkbox
            onChange={() => handleToggle(value._id)} //숫자아이디같이 들어간다!
            checked={Checked.indexOf(value._id) === -1 ? false : true}
          />
          <span> {value.name}</span>
        </React.Fragment>
      </div>
    ));

  return (
    <div>
      {/* 디폴트 액티브키 => 0 으로 해야 닫혀있다 */}
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Item Type" key="1">
          <CustomScrollbars
            style={{ width: "100%", height: 100 }}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
          >
            <div className={styles.CheckBox}>{renderCheckboxLists()}</div>
          </CustomScrollbars>
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
