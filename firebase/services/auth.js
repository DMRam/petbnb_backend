import firebase from 'firebase/app';
import 'firebase/auth';

const auth = firebase.auth();

export const login = async (email, password) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};