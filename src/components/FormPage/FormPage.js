import React from 'react';
import './FormPage.css';
import fire from "../../Firebase/FIrebase.jsx";
/**
 * @component FormPage
 * @description A comprehensive initial treatment form (טופס טיפול ראשוני) component.
 *              This component renders a full-length medical evaluation form, including:
 *              - Personal details
 *              - AVPU assessment
 *              - ABCDE (Airway, Breathing, Circulation, Disability, Exposure) assessment
 *              - Fluids and medication
 *              - Caregiver and evacuation details
 *              
 * @returns {JSX.Element} The FormPage component.
 */
const FormPage = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formElement = e.target;
    const formData = new FormData(formElement);
    
    // Handle multiple selections (checkboxes) and empty fields
    const data = {};
    for (let [key, value] of formData.entries()) {
      // If value is empty string, set it to "none"
      if (value === '') {
        value = 'none';
      }
      
      if (data[key]) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
    
    // Add "none" for unchecked checkboxes and unselected radio buttons
    const allInputs = formElement.querySelectorAll('input, select, textarea');
    console.log('All inputs:', allInputs);
    allInputs.forEach(input => {
      if (!data[input.name]) {
        if (input.type === 'checkbox' || input.type === 'radio') {
          data[input.name] = 'none';
        }
      }
    });
    
    try {
      console.log('Sending data:', data);
      // Send data to Firebase
      await fire.sendData(data); 
      alert('הטופס נשלח בהצלחה!');

    } catch (error) {
      console.error('Error details:', error);
      alert(`שגיאה בשמירת הטופס: ${error.message}`);
    }
  };

  const handleReset = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את הטופס?')) {
      document.querySelector('form').reset();
    }
  };

  const handleUrgentEvac = () => {
    alert('פינוי דחוף נשלח!');
  };

  const handleReturnToAction = () => {
    alert('אושרה חזרה לפעילות');
  };

  const handleWait = () => {
    alert('סטטוס: ממתין');
  };

  return (
    <div className="form-page-container">
      <h1 className="form-title">טופס טיפול ראשוני</h1>

      <form className="form-wrapper" onSubmit={handleSubmit}>
        {/* Personal Details Section */}
        <section className="form-section">
          <h2 className="section-title">פרטים אישיים</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="formNumber">מספר טופס</label>
              <input
                type="text"
                id="formNumber"
                name="formNumber"
                placeholder="הכנס מספר טופס"
              />
            </div>
            <div className="form-group">
              <label htmlFor="personalNumber">מספר אישי/ת.ז</label>
              <input
                type="text"
                id="personalNumber"
                name="personalNumber"
                placeholder="הכנס מספר אישי/ת.ז"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">שם מלא</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="הכנס שם מלא"
              />
            </div>
            <div className="form-group">
              <label>שעת פציעה/תאריך פציעה</label>
              <div className="form-subrow">
                <input
                  type="text"
                  id="injuryDate"
                  name="injuryDate"
                  placeholder="20.12.2024"
                />
                <input
                  type="text"
                  id="injuryTime"
                  name="injuryTime"
                  placeholder="12:30"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>מנגנון פציעה</label>
            <div className="option-list">
              <label className="option-pill">
                <input type="radio" name="injuryMechanism" value="אב״כ" />
                אב"כ
              </label>
              <label className="option-pill">
                <input type="radio" name="injuryMechanism" value="חבלה קהה" />
                חבלה קהה
              </label>
              <label className="option-pill">
                <input type="radio" name="injuryMechanism" value="נפילה" />
                נפילה
              </label>
              <label className="option-pill">
                <input type="radio" name="injuryMechanism" value="פיצוץ" />
                פיצוץ
              </label>
              <label className="option-pill">
                <input type="radio" name="injuryMechanism" value="שאיפת דרכים" />
                שאיפת דרכים
              </label>
              <label className="option-pill">
                <input type="radio" name="injuryMechanism" value="הדף מסלול" />
                הדף מסלול
              </label>
              <label className="option-pill">
                <input type="radio" name="injuryMechanism" value="רסיסים" />
                רסיסים
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="injuryDesc">תאר את נסיבות הפציעה</label>
            <textarea
              id="injuryDesc"
              name="injuryDesc"
              placeholder="תאר את נסיבות הפציעה"
            ></textarea>
          </div>
        </section>

        {/* AVPU Section */}
        <section className="form-section">
          <h2 className="section-title">מצב הכרה AVPU</h2>
          <div className="form-group">
            <label>מצב הכרה</label>
            <div className="option-list">
              <label className="option-pill">
                <input type="radio" name="consciousness" value="ערני" />
                ערני
              </label>
              <label className="option-pill">
                <input type="radio" name="consciousness" value="מגיב לקול" />
                מגיב לקול
              </label>
              <label className="option-pill">
                <input type="radio" name="consciousness" value="מגיב לכאב" />
                מגיב לכאב
              </label>
              <label className="option-pill">
                <input type="radio" name="consciousness" value="לא מגיב" />
                לא מגיב
              </label>
            </div>
          </div>
        </section>

        {/* ABCDE Section */}
        <section className="form-section">
          <h2 className="section-title">סכמת ABCDE</h2>

          {/* A - Airway */}
          <fieldset className="form-subsection">
            <legend>A: נתיב אוויר</legend>
            <div className="form-group">
              <label>פגיעה בנתיב אוויר?</label>
              <div className="option-list">
                <label className="option-pill">
                  <input type="radio" name="airwayInjury" value="כן" />
                  <div className="option-pill">כן</div>
                </label>
                <label className="option-pill">
                  <input type="radio" name="airwayInjury" value="לא" />
                  <div className="option-pill">לא</div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="airwayAction">הכנס את הפעולה שבוצעה</label>
              <input
                type="text"
                id="airwayAction"
                name="airwayAction"
                placeholder="הכנס פעולה שבוצעה"
              />
            </div>
            <div className="form-group">
              <label htmlFor="airwayTime">שעת פעולה</label>
              <input
                type="text"
                id="airwayTime"
                name="airwayTime"
                placeholder="12:30"
              />
            </div>
            <div className="form-group">
              <label>האם הפעולה הצליחה?</label>
              <div className="option-list">
                <label className="option-pill">
                  <input type="radio" name="actionSuccess" value="כן" />
                  <div className="option-pill">כן</div>
                </label>
                <label className="option-pill">
                  <input type="radio" name="actionSuccess" value="לא" />
                  <div className="option-pill">לא</div>
                </label>
              </div>
            </div>
          </fieldset>

          {/* B - Breathing */}
          <fieldset className="form-subsection">
            <legend>B: נשימה</legend>
            <div className="form-group">
              <label>פגיעה בנשימה?</label>
              <div className="option-list">
                <label className="option-pill">
                  <input type="radio" name="breathingInjury" value="כן" />
                  <div className="option-pill">כן</div>
                </label>
                <label className="option-pill">
                  <input type="radio" name="breathingInjury" value="לא" />
                  <div className="option-pill">לא</div>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="breathingAction">הכנס את הפעולה שבוצעה</label>
              <input
                type="text"
                id="breathingAction"
                placeholder="הכנס פעולה שבוצעה"
              />
            </div>
            <div className="form-group saturation-group">
              <label htmlFor="saturation">סטורציה</label>
              <div className="saturation-input">
                <input
                  type="text"
                  id="saturation"
                  name="saturation"
                  placeholder="אחוז סטורציה"
                />
                <span>%</span>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="breathingTime">שעת פעולה</label>
              <input
                type="text"
                id="breathingTime"
                placeholder="12:30"
              />
            </div>
            <div className="form-group">
              <label>האם הפעולה הצליחה?</label>
              <div className="option-list">
                <label className="option-pill">
                  <input type="radio" name="actionSuccess" value="כן" />
                  <div className="option-pill">כן</div>
                </label>
                <label className="option-pill">
                  <input type="radio" name="actionSuccess" value="לא" />
                  <div className="option-pill">לא</div>
                </label>
              </div>
            </div>
          </fieldset>

          {/* C - Circulation */}
          <fieldset className="form-subsection">
            <legend>C: מחזור דם</legend>
            <div className="form-group">
              <label htmlFor="capillaryPulse">דופק קפילרי</label>
              <input
                type="text"
                id="capillaryPulse"
                name="capillaryPulse"
                placeholder="הכנס ערך"
              />
            </div>
            <div className="form-group">
              <label htmlFor="radialPulse">דופק רדיאלי</label>
              <input
                type="text"
                id="radialPulse"
                name="radialPulse"
                placeholder="הכנס ערך"
              />
            </div>
            <div className="form-group">
              <label>חיוור?</label>
              <div className="option-list">
                <label className="option-pill">
                  <input type="radio" name="isPale" value="כן" />
                  <div className="option-pill">כן</div>
                </label>
                <label className="option-pill">
                  <input type="radio" name="isPale" value="לא" />
                  <div className="option-pill">לא</div>
                </label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="systolic">לחץ דם סיסטולי</label>
                <input
                  type="text"
                  id="systolic"
                  name="systolic"
                  placeholder="הכנס לחץ דם סיסטולי"
                />
              </div>
              <div className="form-group">
                <label htmlFor="diastolic">לחץ דם דיאסטולי</label>
                <input
                  type="text"
                  id="diastolic"
                  name="diastolic"
                  placeholder="הכנס לחץ דם דיאסטולי"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="circulationTime">שעת פעולה</label>
              <input
                type="text"
                id="circulationTime"
                placeholder="12:30"
              />
            </div>
            <div className="form-group">
              <label>האם הפעולה הצליחה?</label>
              <div className="option-list">
                <label className="option-pill">
                  <input type="radio" name="actionSuccess" value="כן" />
                  <div className="option-pill">כן</div>
                </label>
                <label className="option-pill">
                  <input type="radio" name="actionSuccess" value="לא" />
                  <div className="option-pill">לא</div>
                </label>
              </div>
            </div>
          </fieldset>

          {/* D - Disability (Neurological) */}
          <fieldset className="form-subsection">
            <legend>D: הערכה נוירולוגית</legend>
            <p className="instructions">
              הנחיות: בשלב זה יש לבדוק תפקוד נוירולוגי כולל מוטורי, סנסורי והתרחבות האישונים.
              סמן את החסרים הנוירולוגיים הרלוונטיים והמשך לסולם גלזגו.
            </p>
            <div className="form-group">
              <label>חסרים נוירולוגיים</label>
              <div className="option-list">
                <label className="option-pill">
                  <input type="checkbox" name="neuroDeficits" value="אישונים לא סימטריים" />
                  אישונים לא סימטריים
                </label>
                <label className="option-pill">
                  <input type="checkbox" name="neuroDeficits" value="חוסר מוטורי" />
                  חוסר מוטורי
                </label>
                <label className="option-pill">
                  <input type="checkbox" name="neuroDeficits" value="חוסר סנסורי" />
                  חוסר סנסורי
                </label>
              </div>
            </div>

            <h4 className="sub-title">סולם גלזגו (GCS)</h4>
            <div className="form-group">
              <label>עיניים</label>
              <select name="gcsEyes">
                <option value="">בחר ערך</option>
                <option value="1">אין</option>
                <option value="2">לכאב</option>
                <option value="3">לקול</option>
                <option value="4">ספונטני</option>
              </select>
            </div>

            <div className="form-group">
              <label>תגובה מילולית</label>
              <select name="gcsVerbal">
                <option value="">בחר ערך</option>
                <option value="1">לא תגובה - 1</option>
                <option value="2">קולות - 2</option>
                <option value="3">מילים לא מובנות - 3</option>
                <option value="4">מילים משמעותיות - 4</option>
                <option value="5">מתמצא - 5</option>
              </select>
            </div>

            <div className="form-group">
              <label>תגובה מוטורית</label>
              <select name="gcsMotor">
                <option value="">בחר ערך</option>
                <option value="1">לא תגובה - 1</option>
                <option value="2">אקסטנציה - 2</option>
                <option value="3">פלקסיה - 3</option>
                <option value="4">נסיגה לכאב - 4</option>
                <option value="5">מ Lokal - 5</option>
                <option value="6">מציית - 6</option>
              </select>
            </div>

            <p>כולל: GCS 0/15 ציון</p>
          </fieldset>

          {/* E - Exposure */}
          <fieldset className="form-subsection">
            <legend>E: חשיפה</legend>
            <div className="option-list">
              <label className="option-pill">
                <input type="checkbox" name="exposure" value="קיבוע עמ״ש" />
                קיבוע עמ"ש
              </label>
              <label className="option-pill">
                <input type="checkbox" name="exposure" value="חימום אקטיבי" />
                חימום אקטיבי
              </label>
              <label className="option-pill">
                <input type="checkbox" name="exposure" value="הפשטה וכיסוי" />
                הפשטה וכיסוי
              </label>
            </div>
          </fieldset>
        </section>

        {/* Fluids and Medications */}
        <section className="form-section">
          <h2 className="section-title">נוזלים ותרופות</h2>
          <div className="option-list">
            <label className="option-pill">
              <input type="checkbox" name="treatments" value="נוזלים" />
              נוזלים
            </label>
            <label className="option-pill">
              <input type="checkbox" name="treatments" value="אנטיביוטיקה" />
              אנטיביוטיקה
            </label>
            <label className="option-pill">
              <input type="checkbox" name="treatments" value="הדרמה וכאב" />
              הדרמה וכאב
            </label>
            <label className="option-pill">
              <input type="checkbox" name="treatments" value="אחר" />
              אחר
            </label>
          </div>
          <input
            type="text"
            name="otherTreatments"
            placeholder="פרט טיפולים נוספים"
          />
        </section>

        {/* Caregiver and Evacuation Details */}
        <section className="form-section">
          <h2 className="section-title">פרטי מטפל ופינוי</h2>
          <div className="form-group">
            <label htmlFor="medicSelect">בחר מטפל/ת</label>
            <select id="medicSelect" name="medicSelect">
              <option value="">בחר מטפל/ת</option>
              {/* Add more options if needed */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="evacTime">זמן פינוי</label>
            <input
              type="text"
              id="evacTime"
              name="evacTime"
              placeholder="12:30"
            />
          </div>

          <div className="form-group">
            <label>סוג פינוי</label>
            <div className="option-list">
              <label className="option-pill">
                <input type="radio" name="evacuationType" value="רכב" />
                רכב
              </label>
              <label className="option-pill">
                <input type="radio" name="evacuationType" value="מסוק" />
                מסוק
              </label>
              <label className="option-pill">
                <input type="radio" name="evacuationType" value="ימי" />
                ימי
              </label>
              <label className="option-pill">
                <input type="radio" name="evacuationType" value="יבשתי" />
                יבשתי
              </label>
            </div>
          </div>

          <div className="form-row evac-buttons">
            <button type="button" className="evac-button danger" onClick={handleUrgentEvac}>פינוי דחוף</button>
            <button type="button" className="evac-button danger" onClick={handleReturnToAction}>חזרה לפעילות</button>
            <button type="button" className="evac-button danger" onClick={handleWait}>המתנה</button>
          </div>
        </section>

        <div className="form-actions">
          <button type="submit" className="submit-button">שמור</button>
          <button type="button" className="reset-button" onClick={handleReset}>אפס</button>
        </div>
      </form>
    </div>
  );
};

export default FormPage;

