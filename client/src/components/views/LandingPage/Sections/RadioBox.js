import React, { useState } from "react";
import { Collapse, Radio } from "antd";
import styles from "./RadioBox.module.css";
import Scrollbars from "react-custom-scrollbars";

const { Panel } = Collapse;

function RadioBox(props) {
  const [Value, setValue] = useState(0);
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
  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <div>
        <Radio key={value._id} value={value._id}>
          {value.name}
        </Radio>
      </div>
    ));

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };

  return (
    <div>
      {/* 디폴트 액티브키 => 0 으로 해야 닫혀있다 */}
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <CustomScrollbars
            style={{ width: "100%", height: 100 }}
            autoHide
            autoHideTimeout={500}
            autoHideDuration={200}
          >
            <Radio.Group onChange={handleChange} value={Value}>
              <div className={styles.RadioBox}>{renderRadioBox()}</div>
            </Radio.Group>
          </CustomScrollbars>
          {/* 라디오그룹을 써야 한개만 선택가능하게 할수있다! */}
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
