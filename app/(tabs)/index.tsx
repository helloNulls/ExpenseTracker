import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, Alert, Button, TextInput, TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker'; // Import the Picker component

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen(): JSX.Element {

  const [amount, setAmount] = useState('');
  const [item, setItem] = useState('');
  const [date, setDate] = useState('');
  const [wallet, setWallet] = useState(''); // State for wallet selection


  const handleSaveExpense = () => {
    // 입력 값 확인 및 저장 로직
    if (wallet && amount && item && date) {
      Alert.alert('저장 성공', `항목: ${item}\n금액: ${amount}\n날짜: ${date}`);
      Alert.alert('Save Successful', `Wallet: ${wallet}\nItem: ${item}\nAmount: ${amount}\nDate: ${date}\n`);
      setWallet('');
      setAmount('');
      setItem('');
      setDate('');
      
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Expenses for This Month : </ThemedText>
        
      </ThemedView>


   {/* Expense Input Section */}
   <ThemedView style={styles.expenseContainer}>
        <ThemedText type="subtitle">Input Your Expense</ThemedText>
   
{/* Wallet Selection Dropdown */}
<Picker
          selectedValue={wallet}
          style={styles.picker}
          onValueChange={(itemValue) => setWallet(itemValue)}>
          <Picker.Item label="Select My Wallet" value="" />
          <Picker.Item label="Cash" value="Cash" />
          <Picker.Item label="Debit" value="Debit" />
          <Picker.Item label="Credit Card" value="Credit Card" />
        </Picker>

        {/* Amount Input Section */}

        <View style={styles.inputRow}>
          {/* (+), (-), Transfer Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Transfer</Text>
            </TouchableOpacity>
          </View>
          
       {/* Amount Input */}
       <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>

                {/* Category and Date Inputs */}

        <TextInput
          style={styles.input}
          placeholder="Category"
          value={item}
          onChangeText={setItem}
        />
        <TextInput
          style={styles.input}
          placeholder="Data (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <Button title="Save" onPress={handleSaveExpense} />
      </ThemedView>


     
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  expenseContainer: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    marginRight: 10,
  },
  button: {
    padding: 6,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginBottom: 6,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginVertical: 8,
    padding: 8,
  },


});
