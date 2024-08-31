import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ImageBackground,StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
const services = [
  {
    id: 1,
    name: 'Criminal Law',
    description: `Criminal law, the body of law that defines criminal offenses, regulates the apprehension, charging, and trial of suspected persons, and fixes penalties and modes of treatment applicable to convicted offenders.

    Criminal law is only one of the devices by which organized societies protect the security of individual interests and ensure the survival of the group. There are, in addition, the standards of conduct instilled by family, school, and religion; the rules of the office and factory; the regulations of civil life enforced by ordinary police powers; and the sanctions available through tort actions. The distinction between criminal law and tort law is difficult to draw with real precision, but in general one may say that a tort is a private injury whereas a crime is conceived as an offense against the public, although the actual victim may be an individual.`,
    image: require('../assets/Lawyer1.jpg')
  },
  {
    id: 2,
    name: 'Family Law',
    description: `Family law, body of law regulating family relationships, including marriage and divorce, the treatment of children, and related economic matters.

    In the past, family law was closely connected with the law of property and succession (see property law), and, judging from the records available, it must have originated principally in the economic and property questions created by the transfer of a female from her father’s family to the power and guardianship of her husband. Even with regard to the relationship between parent and child, legal concepts such as guardianship, custody, and legitimacy were associated with family power structures and family economic interests. Family law also traditionally has to do with matters of personal status—for example, the question of whether a person is to be considered married or single, legitimate or illegitimate—though the incidents and importance of these distinctions often derive from the law of property.`
  },
  {
    id: 3,
    name: 'Civil Law',
    description: `Civil law, the law of continental Europe, based on an admixture of Roman, Germanic, ecclesiastical, feudal, commercial, and customary law. European civil law has been adopted in much of Latin America as well as in parts of Asia and Africa and is to be distinguished from the common law of the Anglo-American countries.

    The term civil law has other meanings not employed in this article. The term jus civile, meaning “civil law,” for example, was used in ancient Rome to distinguish the law found exclusively in the city of Rome from the jus gentium, the law of all nations, found throughout the empire. The phrase has also been used to distinguish private law, governing the relations between individuals, from public law and criminal law. Finally, in the philosophy of law, civil law sometimes refers to the positive law of the state, as distinct from natural law.`
  },
  {
    id: 4,
    name: 'Corporate Law',
    description: `Corporate law includes the law about companies and their formations, operations, mergers, and acquisitions. For example, when a big company looks to buy a smaller company, two companies want to join together, or an investor tries to put money into a startup, they’ll look to corporate law to know how to legally conduct the transaction.

    People in corporate law carry out everything needed to complete these transactions, from legal research to reviewing the final deal.

    Entry-level corporate lawyers often conduct legal research and due diligence. Legal research means they research what laws apply to their clients and how those laws might affect the transaction. Due diligence means they look into the corporations at play, specifically things like debts, assets, employment contracts, and compensation agreements.`
  },
  {
    id: 5,
    name: 'Banking Matters',
    description: `Banking law may be defined as the laws and regulations governing the legal relationships between banks inter se, between the banks and their customers, and other interested persons.

    There are a broad range of subjects distinctive to banks and banking law. The business of banking is primarily governed by the common law and covers areas such as the relation of banker and customer, the payment of cheques and the protection and duties of the paying banker, banker's lien, the appropriation of payments, the banker as bailee, the collection of cheques and the protection and duties of the collecting banker, electronic funds transfer, bankers' books, secrecy, references and advice, letters of credit and performance bonds, lending and security, guarantees, and freezing injunctions. There are also specific accounting requirements for banking companies and groups. See Companies Act 2006, ss 380-474, 476-539.`
    
  },
  {
    id: 6,
    name: 'Labour Law',
    description: `Labour law, the varied body of law applied to such matters as employment, remuneration, conditions of work, trade unions, and industrial relations. In its most comprehensive sense, the term includes social security and disability insurance as well. Unlike the laws of contract, tort, or property, the elements of labour law are somewhat less homogeneous than the rules governing a particular legal relationship. In addition to the individual contractual relationships growing out of the traditional employment situation, labour law deals with the statutory requirements and collective relationships that are increasingly important in mass-production societies, the legal relationships between organized economic interests and the state, and the various rights and obligations related to some types of social services.`
  },
  {
    id: 7,
    name: 'Tax Law',
    description: `Tax law, body of rules under which a public authority has a claim on taxpayers, requiring them to transfer to the authority part of their income or property. The power to impose taxes is generally recognized as a right of governments. The tax law of a nation is usually unique to it, although there are similarities and common elements in the laws of various countries.

    In general, tax law is concerned only with the legal aspects of taxation, not with its financial, economic, or other aspects. The making of decisions as to the merits of various kinds of taxes, the general level of taxation, and the rates of specific taxes, for example, does not fall into the domain of tax law; it is a political, not a legal, process.`
  },
  {
    id: 8,
    name: 'Environmental Law',
    description: `Environmental law, principles, policies, directives, and regulations enacted and enforced by local, national, or international entities to regulate human treatment of the nonhuman world. The vast field covers a broad range of topics in diverse legal settings, such as state bottle-return laws in the United States, regulatory standards for emissions from coal-fired power plants in Germany, initiatives in China to create a “Green Great Wall”—a shelter belt of trees—to protect Beijing from sandstorms, and international treaties for the protection of biological diversity and the ozonosphere. During the late 20th century environmental law developed from a modest adjunct of the law of public health regulations into an almost universally recognized independent field protecting both human health and nonhuman nature.`
  },
  {
    id: 9,
    name: 'Real Estate Law',
    description: `Real estate law, or real property law, generally refers to the laws controlling the ownership or use of land in the United States. Real estate law is a branch of civil law that covers the right to own, possess, use, and enjoy land and the permanent man-made additions attached to it. Real estate law directly or indirectly impacts most of us on a daily basis, affecting homeowners, renters, landlords, home buyers, and home sellers.`
  },
  {
    id: 10,
    name: 'Immigration Law',
    description: `Immigration law includes the national statutes, regulations, and legal precedents governing immigration into and deportation from a country. Strictly speaking, it is distinct from other matters such as naturalization and citizenship, although they are sometimes conflated.`
  },
];

const HomeScreen = ({ navigation }) => {

  const  isAuthenticated  = useSelector((state) => state?.auth?.isAuthenticated);
  const userType = useSelector((state) => state.auth?.user?.userType);

  const [selectedService, setSelectedService] = useState(null);


  const handleServicePress = (service) => {
    if (selectedService && selectedService.id === service.id) {
      setSelectedService(null); // Hide description if the same service is clicked again
    } else {
      setSelectedService(service); // Show description for the clicked service
    }
  };


  useEffect(() => {
    // Redirect based on authentication and userType
    if (isAuthenticated) {
      userType === "Client" ? navigation.navigate('CModule'):navigation.navigate('LModule')
    } else {
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  return (
    <LinearGradient
      colors={['#f8fafc', '#e0f7fa']}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <ImageBackground
          source={require('../assets/LawyerLogo3.png')}
          style={styles.imageBackground}
          imageStyle={{ resizeMode: 'cover' }}
        >
          <Text style={styles.title}>
            Pak Lawyers Hub
          </Text>
        </ImageBackground>

        <View style={styles.content}>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.headerText}>
              Welcome to Pak Lawyers Hub
            </Text>
            <Text style={styles.subHeaderText}>
              Explore our comprehensive range of legal services tailored to meet your needs
            </Text>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 0 }}>
            {services.map((service) => (
              <View key={service.id} style={{ width: '50%', padding: 8 }}>
                <Pressable
                  style={{
                    backgroundColor: selectedService && selectedService.id === service.id ? '#007bff' : '#f0f0f0',
                    padding: 16,
                    borderRadius: 8,
                  }}
                  onPress={() => handleServicePress(service)}
                >
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: selectedService && selectedService.id === service.id ? '#ffffff' : '#000000' }}>{service.name}</Text>
                </Pressable>
              </View>
            ))}
          </View>

          {selectedService && (
            <View style={{ backgroundColor: '#eeeeee', padding: 16, marginTop: 16, borderRadius: 8 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>{selectedService.name}</Text>
              <Text style={{ fontSize: 16 }}>{selectedService.description}</Text>
            </View>
          )}

          <View style={{ marginTop: 24, alignItems: 'center' }}>
            <Pressable
              style={{
                backgroundColor: '#03a9f4',
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: 200,
              }}
              onPress={() => navigation.navigate('Signup', { role: 'Client' })}
            >
              <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginRight: 8 }}>Register</Text>
              <MaterialIcons name="navigate-next" size={24} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  content: {
    padding: 16
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333' // Adjust text color as needed
  },
  subHeaderText: {
    fontSize: 18,
    color: '#333' // Adjust text color as needed
  }
});

export default HomeScreen;
