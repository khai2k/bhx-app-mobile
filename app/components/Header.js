import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TextInput } from 'react-native';
import { Mixins, Colors, Typography } from '@app/styles';
import { HeaderTop } from './HeaderTop';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class Header extends Component {
  render() {
    return (
      <SafeAreaView>
      <View style={styles.headerContainer}>
        <View style={styles.boxlogo}>
          <Image style={styles.logo} source={require('../../assets/images/icon-menu.png')}></Image>
        </View>
        <View style={styles.boxsearch}>
          <TextInput style={styles.input} placeholder='Bạn tìm gì?'></TextInput>
          <Image style={styles.iconsearch} source={require('../../assets/images/icon-search.png')}></Image>
        </View>
        <View style={styles.boxinfo}>
          <View style={styles.boxdelivery}>
            <Text style={styles.textcolor}>Giao tại</Text>
            <Text style={styles.textcolor} numberOfLines={1}>Buôn mê thuộc</Text>
          </View>
          <View style={styles.boxhistory}>
            <Text style={styles.historyorder}>Đơn hàng từng mua</Text>
          </View>
          <View style={styles.boxcart}>
            <View style={styles.boxcartprice}>
              <Text style={styles.textcolor}>Thanh toán</Text>
              <Text style={styles.textcolor}>10.000.000đ</Text>
            </View>
            <View style={styles.boxnumber}>
              <Text style={styles.number}>5</Text>
              <Image style={styles.iconcart} source={require('../../assets/images/icon-shoping-cart.png')}></Image>
            </View>
          </View>
        </View>
      </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap",
    backgroundColor: Colors.GREEN_KEY,
  },
  boxlogo: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: 'center',
  },
  logo: {
    width: '96%',
    height: 40,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  boxsearch:{
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    borderWidth: 0.5,
    maxHeight: 36,
    borderColor: Colors.BLACK,
    fontSize: Typography.FONT_SIZE_10,
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  boxinfo: {
    flex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: "wrap",
    paddingTop: 5,
    paddingBottom: 5,
  },
  boxdelivery:{
    width: '27%',
    justifyContent: 'center',
    fontSize: Typography.FONT_SIZE_12,
    marginLeft: 1,
    borderRightColor: '#00AC5B',
    borderRightWidth: 1,
  },
  boxhistory:{
    width: '26%',
    justifyContent: 'center',
    borderRightColor: '#00AC5B',
    borderRightWidth: 1,
  },
  boxcart:{
    width: '43%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  boxcartprice: {
    width: '75%',
    paddingRight: 2,    
    justifyContent: 'center',
    alignItems: 'flex-end',    
  },
  input:{
    paddingLeft: 2,
  },
  
  iconsearch:{
    padding: 5,
    margin: 5,
    height: 12,
    width: 12,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  textcolor: {
    fontSize: Typography.FONT_SIZE_12,
    color: '#fff',
  },

  iconcart: {
    width: 20,
    height: 20,
    resizeMode: 'stretch',
  },

  historyorder: {
    fontSize: Typography.FONT_SIZE_12,
    textAlign: 'center',
    color: Colors.WHITE,
  },

  boxnumber: {
    width: '20%', 
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'flex-end',
  },

  number: {
    width: 15, 
    height: 15, 
    position: 'absolute',
    top: '5%',
    right: 0,
    zIndex: 1,
    paddingTop: 1, 
    paddingLeft: 4, 
    fontSize: Typography.FONT_SIZE_9,
    borderRadius: 10, 
    backgroundColor: 'red', 
    color: '#FFF87C'
  }

});
