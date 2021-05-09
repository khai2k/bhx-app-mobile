import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView, StatusBar, Linking } from 'react-native';

export default class ListCategory extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [
        {
            uri: 'https://www.bachhoaxanh.com/sua-tuoi',
            name: 'Sữa tươi các loại'
        },
        {
            uri: 'https://www.bachhoaxanh.com/nuoc-ngot',
            name: 'Nước ngọt các loại'
        },
        {
            uri: 'https://www.bachhoaxanh.com/mi',
            name: 'Mì gói ăn liền'
        },
        {
            uri: 'https://www.bachhoaxanh.com/dau-an',
            name: 'Dầu ăn các loại'
        },
        {
            uri: 'https://www.bachhoaxanh.com/khan-giay-uot',
            name: 'Khăn ướt các loại'
        },
        {
            uri: 'https://www.bachhoaxanh.com/dau-goi',
            name: 'Dầu gội các loại'
        },
        {
            uri: 'https://www.bachhoaxanh.com/gao-gao-nep',
            name: 'Gạo ngon các loại'
        },
        {
            uri: 'https://www.bachhoaxanh.com/hai-san-dong-lanh',
            name: 'Thịt hải sản đông'
        }
      ]
    };
  }

  render () {
    return (
      <SafeAreaView>
        <ScrollView 
          horizontal={true} 
          data={this.state.data}
          renderItem={({item}) => {return (<Text>{item.name}</Text>)}}
        />
      </SafeAreaView>
    )
  }
}
