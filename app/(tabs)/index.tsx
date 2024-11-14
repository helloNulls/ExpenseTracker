import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const dummyData = [
  { id: '1', title: 'Category 1', percentage: 20 },
  { id: '2', title: 'Category 2', percentage: 15 },
  { id: '3', title: 'Category 3', percentage: 25 },
  { id: '4', title: 'Category 4', percentage: 10 },
  { id: '5', title: 'Category 5', percentage: 15 },
  { id: '6', title: 'Category 6', percentage: 15 },
];

const chartData = dummyData.map((item, index) => ({
  name: item.title,
  population: item.percentage,
  color: `hsl(${(index * 60) % 360}, 70%, 60%)`,
  legendFontColor: "#7F7F7F",
  legendFontSize: 12,
}));

export default function ExpenseTrackerScreen() {
  const [activeTab, setActiveTab] = useState('reports');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.options}>
          <TouchableOpacity onPress={() => setActiveTab('reports')}>
            <Text style={[styles.optionText, activeTab === 'reports' && styles.activeText]}>
              Reports
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('monthly')}>
            <Text style={[styles.optionText, activeTab === 'monthly' && styles.activeText]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('daily')}>
            <Text style={[styles.optionText, activeTab === 'daily' && styles.activeText]}>
              Daily
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
        />
      </View>

      <FlatList
        contentContainerStyle={styles.categoryList}
        data={dummyData}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text>{item.title}: {item.percentage}%</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
    width: '100%',
    marginTop: 50,
  },
  options: {
    flexDirection: 'row',
    gap: 60,
  },
  optionText: {
    fontSize: 18,
    color: '#000', // Default color for unselected tabs
  },
  activeText: {
    color: '#66bed9', // Color for selected tab
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  categoryList: {
    marginTop: 20,
  },
  categoryItem: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
