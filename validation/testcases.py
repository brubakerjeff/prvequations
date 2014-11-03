from numpy import sqrt


def critical_axial_stress(R, t, nu, E):
    return E / sqrt(3 * (1 - nu**2)) * (t / R)

def critical_ext_pressure(R, t, nu, E):
    return E * t**3 / (4 * R**3 * (1 - nu**2))


if __name__ == "__main__":
    R = 42.0
    t = 0.75
    nu = 0.3
    E = 28.3e6

    print "sigma_cr = %3.2f psi" % critical_axial_stress(R, t, nu, E)
    print "p_cr = %3.2f psi " % critical_ext_pressure(R, t, nu, E)
