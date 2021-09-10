// src/components/Product.js
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Card, Button, Image} from 'react-native-elements';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {withNavigation} from 'react-navigation';

class Product extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={{uri:this.props.product.image}}
          />
        </View>
        <View>
          <Text style={styles.title}>{this.props.product.title}</Text>
          <Text style={styles.subtitle}>${this.props.product.price}</Text>
        </View>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
</LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
      buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
      },
  name: {
    color: '#5a647d',
    fontWeight: 'bold',
    fontSize: 30,
  },
  price: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 10,
    color: '#c1c4cd',
  },
  wrapper: {
    flexDirection: 'row',
    height:200,
    marginBottom: 15,
    backgroundColor:li
  },
  imageWrapper: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#303540',
  },
});

export default withNavigation(Product);

//     <Card style={{display:"flex"}}
// >
{
  /* <Text style={{marginBottom: 10, marginTop: 20 }} h2>
                {this.props.product.category}
            </Text>
            <Text style={styles.price} h4>
                $ {this.props.product.price}
            </Text>
            <Text h6 style={styles.description}>
                added 2h ago
            </Text>
            <Button
            type="clear"
            title='Buy now'
            onPress={() => this.props.navigation.navigate('Details', {
                name: this.props.product.title,
                price: this.props.product.price,
                img: this.props.product.image
            })} /> */
}
//               <Card.Title style={{}}>HELLO WORLD</Card.Title>
//   <Card.Divider/>
//   <Card.Image
//   style={{resizeMode:"contain",alignSelf:"flex-start"}}
//     ImageResizeMode={true}
//     scale={0}
//     width={100}
//     height={150}
//     source = {{uri:this.props.product.image}}>
//     </Card.Image>
//     <Button
//       icon={<Icon name='code' color='#ffffff' />}
//       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
//       title='VIEW NOW' />

//         </Card>
