  // Generate calendar links
  const generateGoogleCalendarLink = (event: any) => {
    console.log('🔍 DEBUG: Generating Google Calendar link for:', event.title);
    console.log('📅 Original Event Data:', {
      date: event.date,
      time: event.time
    });
    
    try {
      // Parse time format like "6:00 PM - 8:00 PM"
      const timeParts = event.time.split(' - ');
      if (timeParts.length !== 2) {
        throw new Error('Invalid time format');
      }
      
      const startTime12h = timeParts[0].trim();
      const endTime12h = timeParts[1].trim();
      
      // Convert to 24-hour format
      const startTime24h = convertTo24Hour(startTime12h);
      const endTime24h = convertTo24Hour(endTime12h);
      
      console.log('🕐 24-Hour Format:', {
        startTime24h,
        endTime24h
      });
      
      // Parse date components
      const [year, month, day] = event.date.split('-');
      
      console.log('📆 Date Components:', {
        year,
        month,
        day,
        originalDate: event.date
      });
      
      // Format dates for Google Calendar - NO timezone conversion, let Google handle it
      const formatDateForGoogle = (time24h: string, timeLabel: string) => {
        const [hours, minutes] = time24h.split(':');
        const result = `${year}${month}${day}T${hours}${minutes}00`;
        
        console.log(`✅ ${timeLabel} Final Result (NO Z):`, result);
        
        return result;
      };
      
      const startDateFormatted = formatDateForGoogle(startTime24h, 'START');
      const endDateFormatted = formatDateForGoogle(endTime24h, 'END');
      
      console.log('📋 Final Formatted Dates (NO Z):', {
        startDateFormatted,
        endDateFormatted
      });
      
      const datesParam = `${startDateFormatted}/${endDateFormatted}`;
      console.log('🔗 Dates Parameter:', datesParam);
      
      const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: event.title,
        dates: datesParam,
        details: event.description || '',
        location: event.location,
        ctz: 'America/Chicago' // Let Google Calendar handle timezone conversion
      });
      
      const finalUrl = `https://calendar.google.com/calendar/render?${params}`;
      console.log('🌐 Final Google Calendar URL:', finalUrl);
      
      return finalUrl;
    } catch (error) {
      console.error('❌ Error generating Google Calendar link:', error);
      return '#';
    }
  };
