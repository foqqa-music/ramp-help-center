export type AudienceType = 'employee' | 'admin' | 'bookkeeper' | 'vendor';

export interface ArticleChunk {
  id: string;
  title: string;
  content: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  audience: AudienceType[];
  lastUpdated: string;
  chunks: ArticleChunk[];
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'communication-preferences',
    title: 'Manage Your Communication Preferences',
    description: 'Control how and when Ramp contacts you via SMS, email, and push notifications.',
    category: 'Account Settings',
    audience: ['employee', 'admin'],
    lastUpdated: '2024-01-15',
    chunks: [
      {
        id: '1-1',
        title: 'Overview',
        content: `Ramp offers comprehensive notifications through SMS, email, and push notifications to keep you informed about your account activity.

Some notifications are mandatory due to legal obligations or financial institution requirements - these cannot be disabled.

To access your notification preferences, navigate to **Profile → My Settings → Notifications** in the Ramp dashboard.`
      },
      {
        id: '1-2',
        title: 'Personal Activity Notifications (Cardholders)',
        content: `As a cardholder, you can configure notifications for:

- **Receipt submission reminders** - Get reminded when receipts are missing for your transactions
- **Approval notifications** - Know when your reimbursements, cards, or Bill Pay requests are approved
- **Transaction alerts** - Receive real-time notifications when your card is used
- **Bill Pay alerts** - Stay updated on payment statuses`
      },
      {
        id: '1-3',
        title: 'Company Activity Notifications (Admins)',
        content: `Administrators have additional notification options:

- **Email digest** - Choose between daily or weekly summary emails
- **Savings updates** - Get insights on company savings and optimization opportunities
- **Teammate activities** - Monitor team spending and card usage
- **Spend reports** - Receive automated spending reports
- **Missing items notifications** - Track outstanding receipts and memos across the organization`
      },
      {
        id: '1-4',
        title: 'Ramp Contact Numbers',
        content: `Ramp uses the following numbers for SMS communications:

- **Shortcode:** HIRAMP (447267) - Primary US number
- **Longcode:** 1-844-331-1023 - For carriers that don't support shortcodes
- **UK/International:** +44 7883 317746

**RCS Support:** If your device supports RCS (Rich Communication Services), you'll see enhanced messaging features with verified sender information.`
      },
      {
        id: '1-5',
        title: 'FAQs',
        content: `**Why do RCS contacts show as "verified"?**
RCS-enabled contacts display Ramp's verified business profile with company information and support details.

**I use Google Voice - why aren't some messages coming through?**
Google Voice has MMS limitations with shortcode messages. Try using the longcode number instead.

**How do I update my email preferences?**
Emails with preference management include an "Update" link at the bottom. Click it to modify your settings.`
      }
    ]
  },
  {
    id: '2',
    slug: 'login-troubleshooting',
    title: 'Troubleshooting Ramp Login Issues',
    description: 'Solutions for common login problems including forgotten credentials, MFA issues, and SSO.',
    category: 'Account Access',
    audience: ['employee', 'admin', 'bookkeeper'],
    lastUpdated: '2024-01-10',
    chunks: [
      {
        id: '2-1',
        title: 'Before You Begin',
        content: `If you're a first-time user, please follow our initial setup guide instead of this troubleshooting article.

Before troubleshooting, confirm your login method:
- **Email/Password:** Standard login with your email and a password you created
- **Single Sign-On (SSO):** Login through Google, Microsoft Entra, Okta, OneLogin, or JumpCloud

**Tip:** Use the password reset form to determine which authentication method is configured for your account.`
      },
      {
        id: '2-2',
        title: 'Forgotten Credentials',
        content: `**Forgotten username:**
Your username is typically the email address associated with your Ramp account. Try the email your company used to invite you.

**Forgotten password:**
1. Go to the Ramp login page
2. Click "Forgot password?"
3. Enter your email address
4. Check your inbox for reset instructions

**No password option visible?**
If you don't see a password field, your account likely uses SSO. Contact your IT department for SSO provider details.`
      },
      {
        id: '2-3',
        title: 'Password Issues',
        content: `**Stolen or compromised password:**
1. Reset your password immediately using the forgot password flow
2. Notify your IT department
3. Review recent account activity for unauthorized transactions

**Not receiving reset email:**
1. Check your spam/junk folder
2. Verify you're using the correct email address
3. Wait a few minutes and try again
4. If still no email, contact Ramp support`
      },
      {
        id: '2-4',
        title: 'MFA Troubleshooting',
        content: `**Lost access to phone number:**
Click "I need to change my phone number" on the login screen and follow the verification process.

**SMS codes not arriving:**
- Check your phone has signal
- Verify the phone number is correct
- Try the voice call option instead
- Contact your carrier if issues persist

**Authenticator app issues:**
If you've lost access to your authenticator app, contact Ramp support with identity verification to reset MFA.`
      },
      {
        id: '2-5',
        title: 'SSO Issues',
        content: `**Google Workspace automatic SSO:**
Some organizations automatically enable Google SSO for all users. Check with your IT team.

**SSO provider not listed:**
Ramp supports Google, Microsoft Entra, Okta, OneLogin, and JumpCloud. If your provider isn't listed, contact your IT department.

**Passkeys:**
Passkeys offer a secure, passwordless alternative. Set them up in your account settings for faster, more secure login.`
      }
    ]
  },
  {
    id: '3',
    slug: 'contact-support',
    title: "How to Contact Ramp's Support Team",
    description: 'All the ways to reach Ramp support including chat, phone, and self-help resources.',
    category: 'Support',
    audience: ['employee', 'admin', 'bookkeeper', 'vendor'],
    lastUpdated: '2024-01-20',
    chunks: [
      {
        id: '3-1',
        title: 'In-App Chat Support',
        content: `Get instant help with most inquiries through our in-app chat:

1. Log into your Ramp account
2. Click the chat icon in the bottom right corner
3. Describe your issue to our support team

For complex issues, you can easily submit a ticket through chat. Access chat directly at **ramp.com/chat**.`
      },
      {
        id: '3-2',
        title: 'Phone Support',
        content: `Speak directly with our support team:

- **US:** 855-206-SAVE (7283)
- **International:** 1-844-331-1023

**Hours of Operation:**
Daily, 7:00 AM to 10:00 PM Eastern Time

For urgent card issues outside business hours, call the number on the back of your Ramp card.`
      },
      {
        id: '3-3',
        title: 'Popular Support Topics',
        content: `Quick links to common support needs:

- **Card limits and spend programs** - Adjust spending limits and policies
- **Bill payment methods and timelines** - Understand payment options
- **Accounting rules and automation** - Set up sync and categorization
- **Booking travel** - Get help with Ramp Travel
- **Card activations and declines** - Resolve card issues quickly`
      },
      {
        id: '3-4',
        title: 'Support by Category',
        content: `Find specialized help for each Ramp feature:

- **Accounting** - Integration setup, sync issues, categorization rules
- **Cards and transactions** - Card management, disputes, limits
- **Bill Pay** - Payment scheduling, vendor setup, approval workflows
- **Reimbursements** - Submission, approval, payment questions
- **Ramp Travel** - Booking, changes, cancellations, policies
- **Integrations** - Third-party app connections and troubleshooting`
      }
    ]
  },
  {
    id: '4',
    slug: 'submitting-reimbursements',
    title: 'Submitting Reimbursements',
    description: 'How to submit out-of-pocket and mileage reimbursements and get paid back.',
    category: 'Expenses',
    audience: ['employee'],
    lastUpdated: '2024-01-18',
    chunks: [
      {
        id: '4-1',
        title: 'Overview',
        content: `Before you can submit reimbursements, your finance team must enable this feature for your account.

Look for the **"Create reimbursement"** or **"New → Reimbursement"** button on your Home page.

Ramp supports two types of reimbursements:
- **Out-of-pocket** - For purchases you made on behalf of the company
- **Mileage** - For business travel using your personal vehicle`
      },
      {
        id: '4-2',
        title: 'Setting Up Your Bank Account',
        content: `To receive reimbursement payments, link a bank account:

1. Go to **Profile → My Settings → Banking**
2. Click **"Add bank account"**
3. Connect using Plaid or enter details manually

**Requirements:**
- US-based personal bank or international bank account
- Account must be able to send and receive payments
- Credit cards cannot be used for reimbursements

While verification is encouraged, it's not required to receive payments.`
      },
      {
        id: '4-3',
        title: 'Out-of-Pocket Reimbursements',
        content: `For purchases made on behalf of your company:

1. Click **"Create reimbursement"** from Home
2. Select **"Out-of-pocket expense"**
3. Upload your receipt (photo or file)
4. Enter expense details:
   - Amount
   - Date
   - Merchant
5. Add memo explaining the business purpose
6. Complete any required accounting fields
7. Submit for approval`
      },
      {
        id: '4-4',
        title: 'Mileage Reimbursements',
        content: `For business travel using your personal vehicle:

1. Click **"Create reimbursement"** from Home
2. Select **"Mileage"**
3. Choose entry method:
   - **Enter locations:** Start and end addresses (distance calculated automatically)
   - **Enter miles:** Total miles driven
4. Add date and business purpose
5. Submit for approval

The reimbursement rate is determined by your company's policy.`
      },
      {
        id: '4-5',
        title: 'Payment Timeline',
        content: `**ACH Reimbursement Payments:**
Funds typically arrive **3-5 business days** after approval.

**Alternative Payment Methods:**
Your company may choose to reimburse you outside of Ramp using:
- Zelle
- Venmo
- Physical check
- Other payment services

Check with your finance team about their preferred reimbursement method.`
      }
    ]
  },
  {
    id: '5',
    slug: 'receipts-and-memos',
    title: 'Submitting Receipts and Memos',
    description: 'Multiple ways to submit receipts and memos for your Ramp transactions.',
    category: 'Expenses',
    audience: ['employee'],
    lastUpdated: '2024-01-12',
    chunks: [
      {
        id: '5-1',
        title: 'Ways to Submit Receipts',
        content: `Ramp offers multiple convenient ways to submit receipts:

- **SMS:** Text receipt photo to HIRAMP (447267) or 844-331-1023 for international
- **Email:** Forward receipts to **receipts@ramp.com**
- **Web:** Click into any transaction and upload directly
- **Mobile App:** Capture receipt or use share extension
- **Slack:** Send receipt to the Ramp app (use /ramp command)`
      },
      {
        id: '5-2',
        title: 'Automatic Receipt Matching',
        content: `Ramp's smart matching technology:

- **Multi-language support** - Receipts in any language are automatically processed
- **International currencies** - Amounts are converted and matched correctly
- **Instant matching** - Receipts are matched to transactions within seconds
- **Duplicate detection** - Same receipt won't be attached twice

Simply submit your receipt and Ramp handles the rest.`
      },
      {
        id: '5-3',
        title: 'Adding Memos',
        content: `Add business context to your transactions:

- **SMS:** Text your memo and it's added to your last transaction
- **Email:** Include "memo: your memo text" in the email body
- **Web/Mobile:** Click into transaction to add memo
- **Slack:** Add memo when prompted after receipt match

Memos help your finance team understand the business purpose of each expense.`
      },
      {
        id: '5-4',
        title: 'Email Forwarding Setup',
        content: `Set up additional email addresses to forward receipts:

1. Go to **Profile → My Settings → Email**
2. Add alternative email addresses
3. Configure auto-forwarding rules in your email client

**Gmail Integration:**
Gmail users can enable dynamic field coding for automatic categorization.

**Note:** Reimbursement receipts must be sent to **reimbursements@ramp.com** instead.`
      },
      {
        id: '5-5',
        title: 'Automated Memo Suggestions',
        content: `Ramp proactively helps complete your transactions:

- **SMS Suggestions:** Receive suggested memos via text after purchases
- **Quick Submission:** Click the link for a mobile-friendly completion flow
- **Accounting Fields:** Add category, department, and other fields directly from the link

This makes it easy to complete expense documentation on the go.`
      }
    ]
  },
  {
    id: '6',
    slug: 'bill-payment-methods',
    title: 'Bill Payment Methods and Timelines',
    description: 'All bill payment options including ACH, card, check, and wire transfers with delivery timelines.',
    category: 'Bill Pay',
    audience: ['admin', 'bookkeeper'],
    lastUpdated: '2024-01-08',
    chunks: [
      {
        id: '6-1',
        title: 'Overview',
        content: `Ramp Bill Pay offers flexible payment options with **no processing fees**.

**Available Payment Methods:**
- Card (Visa)
- ACH (bank transfer)
- Wire transfer (domestic and international)
- Physical check
- Cross-border payments

**Built-in Protection:**
Duplicate bill detection prevents accidental double payments.`
      },
      {
        id: '6-2',
        title: 'Paying by Card',
        content: `Use Ramp cards for bill payments to earn cashback:

**Options:**
- Use existing Ramp cards
- Create single-use virtual cards for one-time payments

**Benefits:**
- Earn 1.5% cashback when vendor accepts Visa
- Track spending in real-time
- Automatic receipt and invoice matching

**Best for:** Vendors that accept card payments, subscriptions, recurring services.`
      },
      {
        id: '6-3',
        title: 'Paying by ACH',
        content: `ACH (Automated Clearing House) is ideal for most vendor payments:

**Delivery Timeline:**
- **Regular ACH:** 2-5 business days
- **Same-day ACH:** Available on eligible bills

**Features:**
- No maximum payment amount
- No fees
- Bank statement shows: "VENDOR NAME INVOICE# BILL PAY"

**Best for:** Regular vendor payments, large invoices, vendors without card acceptance.`
      },
      {
        id: '6-4',
        title: 'Same-Day ACH',
        content: `Speed up payments with same-day ACH:

**Eligibility:**
- Available for qualifying bills
- Must be initiated before cutoff time

**Benefits:**
- Payments arrive same business day
- More efficient cash flow management
- Better vendor relationships

Check the payment options when scheduling to see if same-day is available.`
      },
      {
        id: '6-5',
        title: 'Other Payment Methods',
        content: `Additional payment options for special needs:

**Domestic Wire:**
- For urgent, high-value payments
- Arrives same or next business day
- Higher priority than ACH

**Check:**
- Physical check mailed to vendor
- Allow 7-10 business days for delivery
- Good for vendors requiring paper checks

**International Wire (USD):**
- Send USD to overseas vendors
- 2-5 business days typically

**Cross-Border Payments:**
- Multi-currency support available
- Competitive exchange rates`
      },
      {
        id: '6-6',
        title: 'Payment Dates Explained',
        content: `Understanding payment timing:

**Due Date:**
The date your vendor expects to receive payment. This comes from the invoice.

**Payment Date:**
The date funds leave your Ramp account. You can schedule this based on your cash flow needs.

**Estimated Arrival:**
The projected date payment reaches your vendor. This varies by payment method.

**Tip:** Schedule payments to arrive on or before the due date to maintain good vendor relationships.`
      }
    ]
  },
  {
    id: '7',
    slug: 'booking-travel',
    title: 'Booking Travel on Ramp (Employee Guide)',
    description: 'How to search, book, and manage flights, hotels, and cars through Ramp Travel.',
    category: 'Travel',
    audience: ['employee'],
    lastUpdated: '2024-01-14',
    chunks: [
      {
        id: '7-1',
        title: 'Overview',
        content: `Ramp Travel lets you book business travel directly within the platform:

**What You Can Book:**
- Flights (domestic and international)
- Hotels
- Rental cars

**Key Benefits:**
- See which options are within company policy
- No receipt submission needed after booking
- Track all bookings in one place

Access your trips in the **Travel** tab of your Ramp dashboard.`
      },
      {
        id: '7-2',
        title: 'How to Book',
        content: `Getting started with Ramp Travel:

1. Navigate to **Home → My Trips** tab
2. Click **"Book Travel"**
3. Select flight, hotel, or car
4. Enter your search criteria
5. Choose from available options

**Note:** The Travel tab is only visible if your admin has enabled Ramp Travel for your organization.

Available on both desktop and mobile for booking on the go.`
      },
      {
        id: '7-3',
        title: 'Booking Flights',
        content: `Find and book the right flight:

1. Enter departure and destination cities
2. Select travel dates (one-way or round trip)
3. Review search results

**Filtering Options:**
- Price
- Airline preference
- Departure/arrival times
- Policy compliance

**Policy Indicator:**
Look for the policy icon showing if a flight is within your company's travel policy.

Choose your fare class (basic economy, economy, business) based on policy and preference.`
      },
      {
        id: '7-4',
        title: 'Booking Hotels',
        content: `Find accommodations for your trip:

1. Search by destination and dates
2. Review available properties
3. Compare options

**Filtering Options:**
- Price range
- Amenities (WiFi, parking, gym, etc.)
- Star rating
- Distance from meeting location

**Important:** Always check the cancellation policy before booking - policies vary by property and rate type.`
      },
      {
        id: '7-5',
        title: 'Managing Bookings',
        content: `Keep track of your travel:

**View Bookings:**
All confirmed trips appear in your Travel tab with full details.

**Cancel Bookings:**
Cancel directly through the Travel tab. Refund policies depend on the booking.

**Modify Flights:**
Changes may incur fees depending on fare type and airline.

**Modify Hotels:**
Flexibility depends on property policies - check before modifying.

Retrieve booking confirmations, itineraries, and receipts anytime.`
      },
      {
        id: '7-6',
        title: 'Mid-Trip Support',
        content: `Get help while traveling:

**Flight Disruptions:**
Contact Ramp support immediately for rebooking assistance during delays or cancellations.

**Hotel Issues:**
Work directly with the property first, then contact Ramp if issues aren't resolved.

**Emergency Situations:**
24/7 support available for urgent travel emergencies.

Keep the Ramp app installed on your phone for quick access to support and booking details.`
      }
    ]
  },
  {
    id: '8',
    slug: 'quickbooks-online',
    title: 'QuickBooks Online Overview',
    description: 'How to connect and sync Ramp with QuickBooks Online for seamless accounting.',
    category: 'Integrations',
    audience: ['admin', 'bookkeeper'],
    lastUpdated: '2024-01-05',
    chunks: [
      {
        id: '8-1',
        title: 'Overview',
        content: `Ramp integrates directly with QuickBooks Online for automated accounting:

**Key Benefits:**
- Automatic data transfer from Ramp to QuickBooks
- Respects your existing QuickBooks settings
- Synced expenses are locked in Ramp to prevent edits

This integration saves hours of manual data entry and reduces errors.`
      },
      {
        id: '8-2',
        title: 'What Syncs',
        content: `Data automatically transfers to QuickBooks:

**Transactions:**
Sync as **Expenses** in QuickBooks with full details.

**Reimbursements:**
Sync as **Bills** for proper accounts payable tracking.

**Payments:**
Sync as **Bill Payments** to close out vendor bills.

**Receipts:**
Automatically attached to corresponding QuickBooks transactions.`
      },
      {
        id: '8-3',
        title: 'Setup Guide',
        content: `Connect Ramp to QuickBooks Online:

1. Go to the **Accounting** tab on Ramp Dashboard
2. Select **QuickBooks Online** and click **Connect**
3. Enter your QuickBooks credentials
4. Choose the company file to connect
5. Set default accounts for transactions and reimbursements

**Important:** The default account must be a **Liability** type with **Credit Card** detail type.

Setup typically takes less than 5 minutes.`
      },
      {
        id: '8-4',
        title: 'Additional Features',
        content: `Enhance your QuickBooks integration:

**Automatic Vendor Creation:**
New vendors from transactions are automatically created in QuickBooks after the transaction clears.

**Receipt Attachment:**
All receipts uploaded in Ramp automatically attach to QuickBooks transactions.

**Role Support:**
Integration works for Owner, Admin, and Bookkeeper roles.

**Real-Time Sync:**
Transactions sync continuously - no manual exports needed.`
      },
      {
        id: '8-5',
        title: 'Switching Providers',
        content: `Changing your accounting integration:

**Before Switching:**
- Ensure no bill payments are currently in flight
- Export any needed reports from current setup
- Review outstanding sync items

**What Happens:**
- Previous sync data remains in QuickBooks
- New transactions sync to new provider
- Historical data is preserved

Contact support if you need help migrating between accounting providers.`
      }
    ]
  },
  {
    id: '9',
    slug: 'vendor-portal',
    title: 'Ramp Vendor Portal',
    description: "How vendors can track payments and manage their information through Ramp's Vendor Portal.",
    category: 'Vendors',
    audience: ['vendor'],
    lastUpdated: '2024-01-16',
    chunks: [
      {
        id: '9-1',
        title: 'Overview',
        content: `The Ramp Vendor Portal gives you visibility into payments from Ramp customers:

**Key Features:**
- Manage and track incoming bill payments
- Central location for all receivables from Ramp payers
- Quick, secure updates to company and payment info
- Comment directly with payers on specific bills

Free to use for all vendors receiving payments through Ramp.`
      },
      {
        id: '9-2',
        title: 'Getting Started',
        content: `How to access the Vendor Portal:

**Account creation is optional** - you can still receive payments without an account.

**Process:**
1. A Ramp customer creates a bill with your email address
2. You receive an email notification about the incoming payment
3. Click the link in the email to view payment details
4. Optionally create an account for ongoing access

Creating an account lets you track all payments in one place.`
      },
      {
        id: '9-3',
        title: 'Payment Details Request',
        content: `When a customer needs your payment information:

**Secure Details Collection:**
1. You receive a request email from Ramp
2. Click the secure link to submit:
   - Bank account details (for ACH payments)
   - Tax information (W-9 if applicable)
   - Payment preferences

**Vendor Network:**
You can optionally join Ramp's Vendor Network to streamline future payments from other Ramp customers.

Alternatively, your customer may enter your details manually.`
      },
      {
        id: '9-4',
        title: 'Tracking Payments',
        content: `Monitor your incoming payments:

**Payment Dashboard:**
- View all pending bill payments
- Track payment progress and status
- See bills from all companies paying you through Ramp

**Status Updates:**
- Payment initiated
- Payment in transit
- Payment delivered/completed

Payment destination (bank account) is shown after the payment is initiated.`
      },
      {
        id: '9-5',
        title: 'Managing Your Account',
        content: `Keep your Vendor Portal up to date:

**Initial Setup:**
Complete the setup guide after creating your account to maximize functionality.

**Ongoing Management:**
- Update payment information when bank accounts change
- View complete payment history
- Manage relationships with multiple Ramp payers

**Security:**
All payment and tax information is encrypted and securely stored.`
      }
    ]
  },
  {
    id: '10',
    slug: 'faster-payments',
    title: 'Faster Payments',
    description: 'Get paid faster on invoices with same-day ACH for a small fee.',
    category: 'Vendors',
    audience: ['vendor'],
    lastUpdated: '2024-01-19',
    chunks: [
      {
        id: '10-1',
        title: 'Overview',
        content: `Faster Payments lets you receive invoice payments sooner:

**How It Works:**
- Optional feature - you choose when to use it
- Receive payment same day instead of 3-5 business days
- Small 1% fee for the faster delivery
- No complicated setup required

Available on eligible payments from Ramp Bill Pay customers.`
      },
      {
        id: '10-2',
        title: 'Benefits',
        content: `Why choose Faster Payments:

**Boost Cash Flow:**
Get funds into your account immediately to reinvest in your business.

**Reduce Wait Time:**
Cut payment processing from days to hours.

**Simple Process:**
One-click acceptance via email or Vendor Portal.

**No Commitment:**
Choose Faster Payments on a payment-by-payment basis.`
      },
      {
        id: '10-3',
        title: 'How It Works',
        content: `The Faster Payments process:

1. **Customer schedules payment** through Ramp Bill Pay
2. **You receive an offer** (if the payment is eligible)
3. **Offer appears** in your email notification or Vendor Portal
4. **You decide** whether to accept the faster delivery

**Note:** Not all payments are eligible for Faster Payments. Offers are extended based on payment criteria and aren't guaranteed for every invoice.`
      },
      {
        id: '10-4',
        title: 'Accepting the Offer',
        content: `How to accept Faster Payments:

**From Email:**
1. Open the Faster Payment offer email
2. Click the acceptance link
3. Confirm payment date and 1% fee
4. Verify your bank account details

**From Vendor Portal:**
1. Log into the Vendor Portal
2. Find the eligible payment
3. Click "Accept Faster Payment"
4. Confirm details

**No account required** - you can accept Faster Payments directly from the email link.`
      },
      {
        id: '10-5',
        title: 'Timing Details',
        content: `Important timing information:

**Same-Day Delivery:**
Accept before **4 PM Eastern** for same-business-day deposit.

**Next-Day Delivery:**
Acceptance after 4 PM ET means funds arrive the next business day.

**Offer Expiration:**
Faster Payment offers typically expire within **48 hours**.

**Bank Details:**
You can review and confirm your destination bank account when accepting.`
      },
      {
        id: '10-6',
        title: 'After Acceptance',
        content: `What happens after you accept:

**Payment Processing:**
Ramp automatically switches the payment to same-day ACH.

**Funds Delivery:**
Funds arrive on the specified date, minus the 1% fee.

**Status Tracking:**
- "Payment initiated" - Funds are on the way
- "Paid" - Funds have been delivered

Track all statuses in the Vendor Portal or via email notifications.`
      }
    ]
  }
];

export const categories = [
  { name: 'Getting Started', icon: 'Rocket', description: 'Set up your account and learn the basics' },
  { name: 'Payments & Bills', icon: 'CreditCard', description: 'Manage bill payments, methods, and timelines' },
  { name: 'Expenses & Receipts', icon: 'Receipt', description: 'Submit receipts, memos, and reimbursements' },
];

export const getArticleBySlug = (slug: string): Article | undefined => {
  return articles.find(article => article.slug === slug);
};

export const getArticlesByAudience = (audience: AudienceType): Article[] => {
  return articles.filter(article => article.audience.includes(audience));
};

export const searchArticles = (query: string, audience?: AudienceType): Article[] => {
  const lowerQuery = query.toLowerCase();
  
  return articles.filter(article => {
    const matchesQuery = 
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.chunks.some(chunk => 
        chunk.title.toLowerCase().includes(lowerQuery) ||
        chunk.content.toLowerCase().includes(lowerQuery)
      );
    
    const matchesAudience = !audience || article.audience.includes(audience);
    
    return matchesQuery && matchesAudience;
  });
};
