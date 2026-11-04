import { useReducer } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Registro = {
  numero: number;
  hora: string;
};

type EstadoContador = {
  contador: number;
  registros: Registro[];
};

type AccionContador =
  | { type: 'incrementar'; hora: string }
  | { type: 'reiniciar' };

const estadoInicial: EstadoContador = { contador: 0, registros: [] };

function reducerContador(estado: EstadoContador, accion: AccionContador): EstadoContador {
  if (accion.type === 'reiniciar') {
    return estadoInicial;
  }

  const nuevoContador = estado.contador + 1;
  return {
    contador: nuevoContador,
    registros: [{ numero: nuevoContador, hora: accion.hora }, ...estado.registros],
  };
}

function obtenerHoraActual() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const segundos = String(ahora.getSeconds()).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
}

export default function HomeScreen() {
  const [estado, dispatch] = useReducer(reducerContador, estadoInicial);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Contador de clics</Text>
          <Text style={styles.description}>
            Pulsa el botón para sumar un clic y guardar la hora en el historial.
          </Text>

          <View
            style={[
              styles.counterBox,
              Math.floor(estado.contador / 10) % 2 === 1 && styles.counterBoxAlternate,
            ]}
            accessibilityLiveRegion="polite">
            <Text
              style={[
                styles.counter,
                Math.floor(estado.contador / 10) % 2 === 1 && styles.counterAlternate,
              ]}>
              {estado.contador}
            </Text>
          </View>

          <View style={styles.buttons}>
            <Pressable
              accessibilityRole="button"
              onPress={() => dispatch({ type: 'incrementar', hora: obtenerHoraActual() })}
              style={({ pressed }) => [styles.incrementButton, pressed && styles.pressed]}>
              <Text style={styles.incrementButtonText}>¡Haz clic aquí!</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => dispatch({ type: 'reiniciar' })}
              style={({ pressed }) => [styles.resetButton, pressed && styles.pressed]}>
              <Text style={styles.resetButtonText}>Reiniciar</Text>
            </Pressable>
          </View>

          <View style={styles.table}>
            <View style={[styles.row, styles.tableHeader]}>
              <Text style={[styles.cell, styles.headerText]}>N.º de clic</Text>
              <Text style={[styles.cell, styles.headerText]}>Hora</Text>
            </View>

            {estado.registros.length === 0 ? (
              <Text style={styles.emptyMessage}>Todavía no hay clics registrados.</Text>
            ) : (
              estado.registros.map((registro) => (
                <View key={registro.numero} style={styles.row}>
                  <Text style={styles.cell}>{registro.numero}</Text>
                  <Text style={styles.cell}>{registro.hora}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f3f5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 680,
    padding: 28,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 4,
  },
  title: {
    color: '#202938',
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  description: {
    marginTop: 10,
    color: '#667085',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  counterBox: {
    minHeight: 132,
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d8e6ff',
    borderRadius: 14,
    backgroundColor: '#f3f7ff',
  },
  counterBoxAlternate: {
    borderColor: '#fed7aa',
    backgroundColor: '#fff7ed',
  },
  counter: {
    color: '#1b6fe5',
    fontSize: 72,
    fontWeight: '800',
  },
  counterAlternate: {
    color: '#c2410c',
  },
  buttons: {
    marginTop: 20,
    gap: 12,
  },
  incrementButton: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#25ad62',
  },
  incrementButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  resetButton: {
    alignItems: 'center',
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#d0d5dd',
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },
  resetButtonText: {
    color: '#475467',
    fontSize: 16,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.78,
  },
  table: {
    marginTop: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e1e5eb',
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e5eb',
  },
  tableHeader: {
    backgroundColor: '#f7f9fc',
  },
  cell: {
    flex: 1,
    paddingVertical: 13,
    paddingHorizontal: 10,
    color: '#344054',
    fontSize: 15,
    textAlign: 'center',
  },
  headerText: {
    color: '#344054',
    fontWeight: '700',
  },
  emptyMessage: {
    padding: 18,
    color: '#667085',
    fontSize: 14,
    textAlign: 'center',
  },
});
