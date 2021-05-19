import * as React from 'react';
import { Text, View, Picker, TextInput, StyleSheet } from 'react-native';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.backTop}>Xem lại giỏ hàng</Text>
      <View style={styles.btnGetHistoryAddress}>
        <Text style={styles.textHistoryAddress}>
          LẤY ĐỊA CHỈ MUA HÀNG TRƯỚC ĐÂY
        </Text>
      </View>
      <View style={styles.sectionInput}>
        <Text style={styles.stepTitle}>1. Thông tin nhận hàng</Text>
        <View style={styles.inputAndTit}>
          <Text style={styles.absTit}>Số điện thoại *</Text>
          <TextInput
            style={[styles.inputBox, styles.noBorder, styles.hasAbsTit]}
            placeholder="0901873954"
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );
}
const UserProvAndDis = (props) => {
  return (
    <View>
      <Picker
        selectedValue={this.state.selectedProv}
        onValueChange={(itemValue, itemIndex) => {
          this.setState({
            selectedProv: itemValue,
            selectedProvinceId: itemIndex,
          });
        }}>
        {this.state.cities.map((city) => {
          return (
            <Picker.Item label={city.city} value={city.city} key={city.plaka} />
          );
        })}
      </Picker>
      <Picker
        selectedValue={this.state.selectedDistrict}
        onValueChange={(itemValue, itemIndex) => {
          this.setState({
            selectedDistrict: itemValue,
          });
        }}>
        //render district list based on selected city
        {this.props.cities.length > 0 &&
          this.props.cities[this.state.selectedProvinceId].districts.map(
            (district) => {
              return (
                <Picker.Item label={district} value={district} key={district} />
              );
            }
          )}
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F4F9',
  },
  backTop: {
    padding: 10,
    marginLeft: 30,
    fontSize: 15,
  },
  btnGetHistoryAddress: {
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 15,
  },
  textHistoryAddress: {
    color: '#3B854E',
    fontWeight: '500',
  },
  sectionInput: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  stepTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 15,
  },
  inputBox: {
    padding: 10,
    border: '1px solid #D6E0F5',
    borderRadius: 4,
  },
  noBorder: {
    border: 0,
  },
  hasAbsTit: {
    paddingTop: 28,
  },
  inputAndTit: {
    border: '1px solid #D6E0F5',
  },
  absTit: {
    position: 'absolute',
    paddingLeft: 10,
    paddingTop: 3,
    color: '#8F9BB3',
  },
});
