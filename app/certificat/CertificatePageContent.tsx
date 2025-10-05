'use client';

import { useSearchParams } from 'next/navigation';
import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#000000',
    color: '#FFD700',
    padding: 50,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    color: '#FFD700',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
    border: 4,
    borderColor: '#FFD700',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#FFD700',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    marginTop: 50,
    color: '#FFD700',
    textAlign: 'center',
  },
});

export default function CertificatePageContent() {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get('image') || '';
  const userName = searchParams.get('name') || 'Utilisateur';
  const oeuvreTitle = searchParams.get('oeuvre') || 'Oeuvre Africaine';
  const date = new Date().toLocaleDateString('fr-FR');

  const MyDoc = () => (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Certificat de Gardien du Patrimoine</Text>
        {imageUrl && <Image style={styles.image} src={imageUrl} />}
        <Text style={styles.text}>Nom: {userName}</Text>
        <Text style={styles.text}>Oeuvre: {oeuvreTitle}</Text>
        <Text style={styles.date}>Date: {date}</Text>
        {/* Golden seal SVG - simplified */}
        <View style={{ alignSelf: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 50, color: '#FFD700' }}>♔</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div className="min-h-screen bg-black text-[#FFD700] flex flex-col px-4 py-8">
      <div className="mb-4">
        <a href="/share">
          <button className="text-[#FFD700] hover:text-white">← Retour</button>
        </a>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-center">
          Ton Certificat
        </h1>

      <div className="max-w-4xl w-full mb-8">
        <PDFViewer width="100%" height="500">
          <MyDoc />
        </PDFViewer>
      </div>

      <PDFDownloadLink
        document={<MyDoc />}
        fileName="certificat-mboamuse.pdf"
      >
        {({ loading }) => (
          <button className="bg-[#FFD700] text-black px-8 py-4 rounded-full font-semibold hover:bg-[#FFD700]/80 transition-colors">
            {loading ? 'Génération...' : 'Télécharger le PDF'}
          </button>
        )}
      </PDFDownloadLink>
      </div>
    </div>
  );
}
