const parseVerified = (verified) => {
  if (verified === "PENDING") {
    return "Pendiente";
  }
  if (verified === "VERIFIED") {
    return "Verificado";
  }

  return "Inválido";
};

const parseFraudSituation = (fraudSituation) => {
  if (fraudSituation === "PENDING_RISKY") {
    return "Pendiente - Riesgoso";
  }

  if (fraudSituation === "PENDING_RELIABLE") {
    return "Pendiente - Confiable";
  }

  if (fraudSituation === "FRAUD") {
    return "Fraudulento";
  }

  if (fraudSituation === "TRUSTWORTHY") {
    return "Confiable";
  }

  return "Sin datos";
};

const parseEmploymentStatus = (employmentStatus) => {
  if (employmentStatus === "employee") {
    return "Empleado";
  }

  if (employmentStatus === "self-employed") {
    return "Trabajador independiente";
  }

  if (employmentStatus === "unemployed") {
    return "Desempleado";
  }

  return "Sin datos";
};

const parseHasTesla = (hasTesla) => {
  if (hasTesla === "yes") {
    return "Sí";
  }

  if (hasTesla === "no") {
    return "No";
  }

  return "Sin datos";
};

export {
  parseVerified,
  parseFraudSituation,
  parseEmploymentStatus,
  parseHasTesla,
};
